import React, { useEffect, useState } from "react";
import {
  Contract,
  BrowserProvider,
  formatUnits,
  toBigInt,
  getBigInt,
} from "ethers";
import { BUYER_ABI, BuyerOperationsManagement } from "@/lib/contractaddress";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { handlelogout } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true); // Show loading indicator
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
          toBigInt(item[4]).toString() / toBigInt(item[1]).toString(), // Convert Wei to Ether (18 decimals)
        productImageUrl: item[5],
      }));

      const calculatedTotal = formattedItems.reduce(
        (total, item) => total + parseInt(item.productPrice),
        0
      );
      setTotal(calculatedTotal.toFixed(2)); // Keep the total formatted to 2 decimals
      setCartItems(formattedItems);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const handleRemoveFromCart = async (cartItemId, seller) => {
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

      // Wait for the transaction to be mined
      const tx = await contract.removeFromCart(cartItemId, seller);
      await tx.wait(); // This ensures that the transaction is confirmed before continuing

      console.log("Item removed:", tx);
      fetchCartItems(); // Fetch updated cart items after removal
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };

  const handleCheckout = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">FreshBuy</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-green-700 hover:underline">
            Products
          </Link>
          <Link to="/cart" className="text-green-700 hover:underline">
            Cart
          </Link>
          <Link to="/orders" className="text-green-700 hover:underline">
            Orders
          </Link>
        </div>
        <Button
          variant="destructive"
          onClick={handlelogout}
          className="hidden md:flex bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </nav>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6">
          Your Shopping Cart
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading cart items...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="w-full">
                <CardContent className="flex flex-col md:flex-row items-center p-4">
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800">
                      {item?.productName}
                    </h3>
                    <p className="text-green-600 mt-2">
                      Seller: {item?.seller}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Quantity: {item?.quantity}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                      <p className="text-green-900 font-bold text-lg">
                        ${parseFloat(item?.productPrice).toFixed(2)}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="primary"
                          onClick={() => handleCheckout(item)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Buy
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleRemoveFromCart(item?.id, item?.seller)
                          }
                          className="mt-2 md:mt-0"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-between items-center mt-6">
              <div className="font-semibold text-lg text-blue-800">
                Total: ${total}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-green-800">
              Checkout - {selectedItem.productName}
            </h2>
            <p className="mt-4">
              Price: ${parseFloat(selectedItem.productPrice).toFixed(2)}
            </p>
            <p>Quantity: {selectedItem.quantity}</p>
            <p className="mt-2">
              Total: $$
              {(
                parseFloat(selectedItem.productPrice) * selectedItem.quantity
              ).toFixed(2)}
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={handleModalClose}
                className="bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  alert("Checkout successful!");
                  handleModalClose();
                }}
              >
                Confirm Purchase
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
