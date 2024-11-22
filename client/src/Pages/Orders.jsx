import React, { useEffect, useState } from "react";
import axios from "axios";
import { Contract, BrowserProvider, formatUnits, toBigInt } from "ethers";
import { BUYER_ABI, BuyerOperationsManagement } from "@/lib/contractaddress";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handlelogout } = useAuth();

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
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
      const tx = await contract.getCartItems();
      console.log(tx);

      // Map and format cart items
      const formattedItems = tx.map((item) => ({
        id: item[0].toString(),
        quantity: toBigInt(item[1]).toString(),
        seller: item[2],
        productName: item[3],
        productPrice:
          parseInt(toBigInt(item[4]).toString()) /
          parseInt(toBigInt(item[1]).toString()),
        productImageUrl: item[5],
        status: getRandomStatus(),
      }));

      setOrderItems(formattedItems);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getRandomStatus = () => {
    const statuses = ["Delivered", "returned"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  const handleLogout = () => {
    handlelogout();
    window.location.reload();
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + parseFloat(item.productPrice) * item.quantity,
      0
    );
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">FreshBuy</div>
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center text-green-700 hover:underline"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigate("/cart")}
            className="flex items-center text-green-700 hover:underline"
          >
            Cart
          </button>
          <button
            onClick={() => handleNavigate("/orders")}
            className="flex items-center text-green-700 hover:underline"
          >
            Orders
          </button>
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
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Your Orders</h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading order items...</p>
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
            {orderItems.map((item) => (
              <Card key={item.id} className="w-full">
                <CardContent className="flex flex-col md:flex-row items-center p-4">
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800">
                      {item.productName}
                    </h3>
                    <p className="text-green-600 mt-2">
                      Price: ₹{item.productPrice}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600 mt-2">Seller: {item.seller}</p>
                    <p className="text-gray-600 mt-2">Status: {item.status}</p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                      <p className="text-green-900 font-bold text-lg">
                        ₹{(item.productPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-between items-center mt-6">
              <div className="font-semibold text-lg text-green-800">
                Total: ₹{calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
