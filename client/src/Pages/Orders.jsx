import React, { useEffect, useState } from "react";
import axios from "axios";
import { Contract, BrowserProvider, formatUnits } from "ethers";
import { BUYER_ABI, BuyerOperationsManagement } from "@/lib/contractaddress";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "../lib/loader";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handlelogout } = useAuth();

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  const getPurchaseHistory = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        BuyerOperationsManagement,
        BUYER_ABI,
        signer
      );

      const tx = await contract.getPurchaseHistory();

      // Map and format cart items
      const formattedItems = tx.map((item) => ({
        farmerAddress: item[0],
        productDetails: {
          productName: item[1][1],
          productPrice: parseFloat(formatUnits(item[1][2], 18)), // Convert wei to Ether
          description: item[1][3],
          productType: item[1][4],
          productImageUrl: item[1][5],
          creator: item[1][6],
          productPackedDate: item[1][7],
          productExpire: item[1][8],
        },
        delivered: true,
        quantity: Number(item[2].toString()), // Convert BigInt to number
        totalPrice: parseFloat(formatUnits(item[3], 18)), // Convert wei to Ether
      }));

      setOrderItems(formattedItems);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      setError("Failed to fetch purchase history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    handlelogout();
    window.location.reload();
  };

  const handleNavigate = (path) => {
    window.location.href = path; // Navigate to the desired route
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.productDetails.productPrice * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-full shadow-md px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">FreshBuy</div>
        <div className="hidden md:flex space-x-4">
          <Link
            to={"/"}
            className="flex items-center text-green-700 hover:underline"
          >
            Products
          </Link>
          <Link
            to={"/cart"}
            className="flex items-center text-green-700 hover:underline"
          >
            Cart
          </Link>
          <Link
            className="flex items-center text-green-700 hover:underline"
            to={"/orders"}
          >
            Orders
          </Link>
        </div>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="hidden md:flex bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </nav>

      {/* Order Content */}
      <div className="container mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Your Orders</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader /> {/* Replace with your spinner or loader component */}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => getPurchaseHistory()}
            >
              Retry
            </Button>
          </div>
        ) : orderItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You have no orders</p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleNavigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <Card
                key={index}
                className="w-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <CardContent className="flex flex-col md:flex-row items-center p-4">
                  <img
                    src={item.productDetails.productImageUrl}
                    alt={item.productDetails.productName}
                    className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800">
                      {item.productDetails.productName}
                    </h3>
                    <p className="text-green-600 mt-2">
                      Price: ₹{item.productDetails.productPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Seller: {item.productDetails.creator}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Status: {item.delivered ? "Delivered" : "Pending"}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                      <p className="text-green-900 font-bold text-lg">
                        ₹
                        {(
                          item.productDetails.productPrice * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Total Price */}
      {orderItems.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full shadow-md">
          <p className="text-xl font-semibold">
            Total: ₹{calculateTotal().toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
