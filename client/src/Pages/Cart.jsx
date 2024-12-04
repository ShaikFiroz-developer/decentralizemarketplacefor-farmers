import React, { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import { BUYER_ABI, BuyerOperationsManagement } from "@/lib/contractaddress";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [netPayable, setNetPayable] = useState(0);
  const { handlelogout } = useAuth();
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCheckoutAll, setIsCheckoutAll] = useState(false); // New state to track if we're checking out all items

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true);
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
      const tx = await contract.getMyCartItems();
      console.log(tx);

      const formattedItems = tx.map((item, index) => {
        const farmerAddress = item[0];
        const productId = item[1].toString();
        const imgurl = item[2];
        const quantity = Number(item[3].toString());
        const price = Number(item[4].toString());

        const totalPrice = price * quantity;
        const priceInEther = price;

        return {
          farmerAddress,
          productId,
          imgurl,
          quantity: quantity.toString(),
          price: priceInEther.toFixed(2),
          totalprice: totalPrice.toFixed(2),
        };
      });

      const calculatedTotal = formattedItems.reduce(
        (total, item) => total + parseFloat(item.totalprice),
        0
      );

      setTotal(calculatedTotal.toFixed(2));
      setCartItems(formattedItems);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
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
      const tx = await contract.removeFromCart(cartItemId);
      await tx.wait();

      console.log("Item removed:", tx);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };

  const handlePurchaseCart = async (index) => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    if (!address || !phoneNumber) {
      alert("Please provide both address and phone number.");
      return;
    }
    const buyer = localStorage.getItem("userEmail");

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        BuyerOperationsManagement,
        BUYER_ABI,
        signer
      );
      const indexx = cartItems.length;
      console.log(indexx - 1);
      const tx = await contract.purchaseSingleProduct(
        indexx - 1,
        buyer,
        address,
        phoneNumber
      );
      await tx.wait();
      await fetchCartItems();
      alert("Item purchased successfully!");
    } catch (error) {
      console.error("Error purchasing from cart:", error);
      alert("Failed to purchase item.");
    }
  };

  const handleCheckoutAll = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const buyer = localStorage.getItem("userEmail");

    if (!address || !phoneNumber) {
      alert("Please provide both address and phone number.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        BuyerOperationsManagement,
        BUYER_ABI,
        signer
      );

      const tx = await contract.purchaseCart(buyer, address, phoneNumber);
      await tx.wait();
      alert("All items purchased successfully!");
      fetchCartItems(); // Fetch updated cart after purchase
    } catch (error) {
      console.error("Error purchasing all items from cart:", error);
      alert("Failed to purchase all items from cart.");
    }
  };

  const handleCheckout = (item) => {
    setSelectedItem(item);
    setNetPayable(item.totalprice); // Show the net payable amount for single item
    setIsCheckoutAll(false); // For single item checkout
    setIsModalOpen(true);
  };

  const handleCheckoutAllModalOpen = () => {
    setNetPayable(total); // Show total payable amount for all items
    setIsCheckoutAll(true); // For all items checkout
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setAddress("");
    setPhoneNumber("");
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
            {cartItems.map((item, key) => (
              <Card key={item.productId} className="w-full">
                <CardContent className="flex flex-col md:flex-row items-center p-4">
                  <img
                    src={item.imgurl}
                    alt={item.productId}
                    className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800">
                      Product ID: {item.productId}
                    </h3>
                    <p className="text-green-600 mt-2">
                      Farmer Address: {item.farmerAddress}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Quantity: {item.quantity}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                      <p className="text-green-900 font-bold text-lg">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleRemoveFromCart(key);
                            console.log(key);
                          }}
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
            {/* Checkout All Button */}
            <div className="flex justify-end mt-6">
              <Button
                variant="primary"
                onClick={handleCheckoutAllModalOpen}
                className="bg-green-600 hover:bg-green-700"
              >
                Checkout All Items
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Checkout */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Checkout
            </h2>
            <p className="text-lg text-gray-800 mb-4">Total: ${netPayable}</p>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-800"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handleModalClose}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={
                  isCheckoutAll
                    ? handleCheckoutAll
                    : () => handlePurchaseCart(selectedItem?.productId)
                }
                className="bg-green-600 hover:bg-green-700"
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
