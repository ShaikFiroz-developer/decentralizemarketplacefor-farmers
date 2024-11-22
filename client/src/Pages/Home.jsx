import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUnits, getBigInt, parseUnits, toBigInt } from "ethers";
import {
  Menu,
  Home,
  ShoppingCart,
  Package,
  LogOut,
  Search,
  Apple,
  Wheat,
  Carrot,
  Milk,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { BrowserProvider, Contract } from "ethers";
import {
  BUYER_ABI,
  BuyerOperationsManagement,
  FarmerOperationsManagement,
  FARMER_ABI,
} from "@/lib/contractaddress";

const categories = [
  { name: "Fruits", icon: Apple },
  { name: "Vegetables", icon: Carrot },
  { name: "Grains", icon: Wheat },
  { name: "Dairy", icon: Milk },
];

const HomePage = () => {
  const { handlelogout, isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartitems, setcartitems] = useState([]);
  const [quantity, setquantity] = useState(0);
  const productsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    if (localStorage.getItem("useRole") == "farmer") {
      navigate("/admin");
    }
    fetchProducts();
  }, [isLoggedIn]);

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
      const tx = await contract.getAllListedProducts();
      const formattedProducts = tx.map((product) => ({
        _id: product[0],
        productName: product[1],
        productPrice: formatUnits(product[2], 18), // Convert from BigInt to human-readable price
        description: product[3],
        productType: product[4],
        productImageUrl: product[5],
        seller: product[6],
        createdDate: product[7],
        expiryDate: product[8],
        quantity: product[9],
      }));
      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    filterProducts(searchTerm, newCategory);
  };

  const filterProducts = (term, category) => {
    let result = [...products];

    if (term) {
      result = result.filter((product) =>
        product.productName.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((product) => product.productType === category);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  };

  const handleLogout = async () => {
    await handlelogout();
    window.location.reload();
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const handlePurchase = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(BuyerOperationsManagement, BUYER_ABI, signer);

    try {
      const price = parseUnits(selectedProduct.productPrice, 18);

      // Convert _id to BigInt directly
      const productId = BigInt(selectedProduct._id);
      console.log(productId);

      const tx = await contract.addToCart(
        productId.toString(),
        quantity,
        selectedProduct.seller,
        selectedProduct.productName,
        quantity * selectedProduct.productPrice,
        selectedProduct.productImageUrl
      );
      await tx.wait();
      alert("Purchase successful!");
      setModalOpen(false);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-green-600" />
            <Input
              placeholder="Search products..."
              className="pl-10 border-green-300 w-full"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                onClick={() => handleCategoryFilter(cat.name)}
                className="flex items-center"
              >
                <cat.icon className="mr-2" /> {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {currentProducts.map((product) => (
            <Card
              key={product._id}
              className="shadow-md cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="space-y-2">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="h-48 object-cover w-full"
                />
                <div className="text-center space-y-1">
                  <div className="font-bold text-lg">{product.productName}</div>
                  <div className="text-gray-500">{product.productType}</div>
                  <div className="text-green-700 text-xl">
                    ${product.productPrice}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div
          className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-2xl font-bold mb-4">
              {selectedProduct.productName}
            </h3>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <img
              src={selectedProduct.productImageUrl}
              alt={selectedProduct.productName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-xl font-semibold mb-4">
              Price: ₹{selectedProduct.productPrice}
            </div>

            {/* Additional details */}
            <div className="mb-4">
              <span className="font-semibold">Seller ID:</span>{" "}
              {selectedProduct.sellerId}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Packed Date:</span>{" "}
              {new Date(selectedProduct.packedDate).toLocaleDateString()}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Expiry Date:</span>{" "}
              {new Date(selectedProduct.expiryDate).toLocaleDateString()}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center space-x-4">
              {/* Cart and Buy Section */}
              <div className="flex flex-col items-start space-y-4">
                {/* Cart Section */}
                <div className="w-full shadow p-4 flex flex-col items-start justify-start rounded-md space-y-2">
                  <p className="text-sm font-medium text-white">Amount:</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      setquantity(e.target.value);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={handlePurchase} className="w-full">
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Close Button */}
              <Button
                variant="destructive"
                className="ml-2"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
