import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  ShoppingCart,
  LogOut,
  Sprout,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FARMER_ABI } from "@/lib/contractaddress";
import { FarmerOperationsManagement } from "@/lib/contractaddress";
import { BrowserProvider, parseEther } from "ethers";
import { Contract, formatUnits } from "ethers";
import { useAuth } from "@/context/authContext";

const buyers = [
  {
    orderId: "101",
    buyer: "ruhem",
    productId: "1",
    quantity: 10,
    price: "50",
    status: "Pending",
    productName: "",
  },
  {
    orderId: "102",
    buyer: "Shami",
    productId: "2",
    quantity: 5,
    price: "15",
    status: "rakaf",
    productName: "",
  },
  {
    orderId: "103",
    buyer: "kaleem",
    productId: "1",
    quantity: 20,
    price: "100",
    status: "Pending",
    productName: "",
  },
];

const FarmerDashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(buyers);
  const [revenue, setRevenue] = useState(0);
  const [newProduct, setNewProduct] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const { handlelogout } = useAuth();

  const fetchProducts = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        FarmerOperationsManagement,
        FARMER_ABI,
        signer
      );
      const tx = await contract.getMyProducts();
      const formattedProducts = tx.map((product) => ({
        _id: product[0],
        productName: product[1],
        productPrice: formatUnits(product[2], 18),
        description: product[3],
        productType: product[4],
        productImageUrl: product[5],
        seller: product[6],
        createdDate: product[7],
        expiryDate: product[8],
        quantity: product[9],
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        FarmerOperationsManagement,
        FARMER_ABI,
        signer
      );
      const tx = await contract.getMyProductOrders();
      const formattedOrders = tx.map((order) => ({
        orderId: order[0],
        buyer: order[1],
        productId: order[2],
        quantity: order[3],
        price: formatUnits(order[4], 18),
        status: order[5],
      }));
      setRevenue(Math.ceil(Math.random() * 1000) * 10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("useRole") === "buyer") {
      navigate("/admin");
    }
  }, []);

  const handleLogout = async () => {
    await handlelogout();
    window.location.reload();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        FarmerOperationsManagement,
        FARMER_ABI,
        signer
      );
      const tx = await contract.addProduct(
        newProduct.productName,
        parseEther(newProduct.productPrice.toString()),
        newProduct.description,
        newProduct.productType,
        newProduct.imageUrl,
        newProduct.productPacked,
        newProduct.productExpire
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      alert("Product added successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      console.log(response);

      const imageUrl = response.data.url;
      console.log("Image uploaded successfully:", imageUrl);
      setNewProduct((prev) => ({
        ...prev,
        imageUrl: imageUrl, // Set the image URL
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );
  const otherOrders = orders.filter((order) => order.status !== "Delivered");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <nav className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-green-800">
                Farmer Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-green-600 hover:text-green-800 hover:bg-green-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/90">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full p-3 bg-green-100">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <h3 className="text-2xl font-bold text-green-800">
                  {products.length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full p-3 bg-green-100">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <h3 className="text-2xl font-bold text-green-800">
                  {otherOrders.length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full p-3 bg-green-100">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold text-green-800">
                  ₹{revenue.toFixed(2)}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/90 p-1 space-x-2">
            <TabsTrigger
              value="products"
              className="text-green-600 hover:text-green-800"
            >
              My Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="text-green-600 hover:text-green-800"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="addProduct"
              className="text-green-600 hover:text-green-800"
            >
              Add Product
            </TabsTrigger>
          </TabsList>

          <div>
            <TabsContent value="products">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                  >
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      className="w-full h-52 object-cover"
                    />
                    <CardContent className="p-4">
                      <h2 className="text-lg font-bold text-green-800 tracking-wide">
                        {product.productName}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-green-700 font-semibold text-md">
                          Price: ₹{product.productPrice}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 mx-1 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 text-sm font-semibold rounded ${
                      currentPage === index + 1
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 mx-1 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </TabsContent>
          </div>

          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-green-800">Orders</h2>
              <span className="text-lg text-green-600">
                Active Orders:{" "}
                {orders.filter((order) => order.status === "active").length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white/90 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 relative overflow-hidden"
                >
                  {/* Decorative Gradient Border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-green-100 via-green-50 to-green-200 opacity-40"></div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <header className="mb-4">
                      <h3 className="text-xl font-bold text-green-800">
                        Order ID: {order.orderId}
                      </h3>
                      <p className="text-sm text-green-600">
                        Buyer: {order.buyer}
                      </p>
                    </header>
                    <main className="space-y-3 text-gray-700">
                      <p>
                        <span className="font-semibold">Product ID:</span>{" "}
                        {order.productId}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {order.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Price:</span> ₹
                        {order.price}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </main>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="addProduct">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-800">
                Add New Product
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.productName}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productName: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newProduct.productPrice}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productPrice: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="text"
                  placeholder="Product Type"
                  value={newProduct.productType}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productType: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="file"
                  onChange={handleImageUpload}
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="date"
                  placeholder="Packed Date"
                  value={newProduct.productPacked}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productPacked: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Input
                  type="date"
                  placeholder="Expiry Date"
                  value={newProduct.productExpire}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productExpire: e.target.value,
                    })
                  }
                  className="border border-green-300 rounded-lg p-2"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 text-white hover:bg-green-800"
                >
                  Add Product
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;
