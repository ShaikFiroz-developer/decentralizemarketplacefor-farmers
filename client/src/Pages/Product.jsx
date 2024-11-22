import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ShoppingCart, Package, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/context/authContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const { handlelogout } = useAuth();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/seller/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setProduct(response.data.product);
        console.log(response.data.product.creator._id);
        fetchOtherProducts(response.data.product.creator._id);
        // Fetch other products from the same seller
      } else {
        console.error(
          "Failed to fetch product details:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchOtherProducts = async (sellerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/seller-by-id/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Fetched other products:", response.data); // Check the response
      if (response.data.success) {
        setOtherProducts(response.data.products);
      } else {
        console.error("Failed to fetch other products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching other products:", error);
    }
  };

  const handleLogout = async () => {
    handlelogout();
  };

  const addToCart = async () => {
    setIsAdding(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/user/${id}/cart`,

        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Product added to cart successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">FreshBuy</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="flex items-center text-green-700 hover:underline"
          >
            <Home className="mr-2" /> Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center text-green-700 hover:underline"
          >
            <ShoppingCart className="mr-2" /> Cart
          </Link>
          <Link
            to="/orders"
            className="flex items-center text-green-700 hover:underline"
          >
            <Package className="mr-2" /> Orders
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        <Button
          variant="destructive"
          onClick={handleLogout}
          className="hidden md:flex bg-red-500 hover:bg-red-600"
        >
          <LogOut className="mr-2" /> Logout
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" className="flex items-center text-green-700">
              <Home className="mr-2" /> Products
            </Link>
            <Link to="/cart" className="flex items-center text-green-700">
              <ShoppingCart className="mr-2" /> Cart
            </Link>
            <Link to="/orders" className="flex items-center text-green-700">
              <Package className="mr-2" /> Orders
            </Link>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600"
            >
              <LogOut className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      )}

      {/* Product Details Content */}
      <div className="container mx-auto px-4 py-6">
        {product ? (
          <Card className="max-w-3xl mx-auto p-6">
            <CardContent className="flex flex-col lg:flex-row">
              {/* Product Image Section */}
              <div className="lg:w-1/2">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="w-full h-64 object-cover rounded-md mb-4 lg:mb-0"
                />
              </div>

              {/* Product Details Section */}
              <div className="lg:w-1/2 lg:pl-8">
                <h1 className="text-3xl font-bold text-green-800 mb-4">
                  {product.productName}
                </h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-600 font-medium mt-2">
                  Category: {product.productType}
                </p>
                <p className="text-gray-500 mt-1">
                  Packed on: {new Date(product.productPacked).toDateString()}
                </p>
                <p className="text-gray-500 mt-1">
                  Expires on: {new Date(product.productExpire).toDateString()}
                </p>
                <p className="text-green-900 font-bold mt-4 text-lg">
                  ₹{product.productPrice}
                </p>
                <p className="mt-4 text-gray-600">
                  Seller:{" "}
                  <span className="font-semibold">
                    {product.creator.fullname}
                  </span>
                </p>
                <p className="text-gray-600">
                  Address: {product.creator.address}
                </p>

                {/* Add to Cart Button */}
                <div className="mt-6">
                  <Button
                    variant="default"
                    onClick={addToCart}
                    disabled={isAdding}
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isAdding ? "Adding..." : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-gray-600">
            Loading product details...
          </p>
        )}

        {/* Other Products of the Seller */}

        {/* Other Products of the Seller */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Other Products from {product?.creator.fullname}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {" "}
            {/* Adjusted to grid-cols-4 for more compact display */}
            {otherProducts.map((prod) => (
              <Card key={prod._id} className="p-2">
                {" "}
                {/* Reduced padding */}
                <CardContent>
                  <img
                    src={prod.productImageUrl}
                    alt={prod.productName}
                    className="w-full h-32 object-cover mb-4 rounded-md" // Reduced height
                  />
                  <h3 className="text-lg font-semibold text-green-800">
                    {prod.productName}
                  </h3>{" "}
                  {/* Reduced font size */}
                  <p className="text-sm text-gray-600">
                    {prod.description}
                  </p>{" "}
                  {/* Reduced font size */}
                  <p className="text-green-900 font-bold mt-2">
                    ₹{prod.productPrice}
                  </p>
                  <Link
                    to={`/product/${prod._id}`}
                    className="text-green-600 hover:underline mt-4 block text-sm"
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
