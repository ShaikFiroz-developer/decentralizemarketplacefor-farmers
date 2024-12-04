import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatUnits,
  getBigInt,
  parseUnits,
  toBigInt,
  ethers,
  isAddress,
} from "ethers";
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
  const [cartitems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const productsPerPage = 8;
  const navigate = useNavigate();

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



  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    if (localStorage.getItem("userRole") == "farmer") {
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



  const handleLogout = async () => {
    await handlelogout();
    window.location.reload();
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = async (product, quantity) => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(
        BuyerOperationsManagement,
        BUYER_ABI,
        signer
      );
      console.log(product);
      const tx = await contract.addToCart(
        product.seller,
        BigInt(product._id),
        product.productImageUrl,
        BigInt(quantity),
        BigInt(Math.floor(Number(product.productPrice)))
      );

      await tx.wait();
      console.log(tx);

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handlePurchaseProduct = async (product, quantity) => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
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

      /**
        * uint index,
        string memory buyerName,
        string memory userAddress,
        string memory userPhoneNo
        */
      const tx = await contract.purchaseSingleProduct(
        BigInt(product._id),
        product.seller,
        quantity
      );
      await tx.wait();
      alert("Product purchased successfully!");
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to purchase product.");
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
              <CardContent className="space-y-4">
  <img
    src={product.productImageUrl}
    alt={product.productName}
    className="h-48 object-cover w-full rounded-md"
  />

  <div className="text-left space-y-2">
    <div className="font-bold text-lg text-green-800">{product.productName}</div>

    <div className="text-gray-500 text-sm">{product.productType}</div>

    <div className="text-green-700 text-xl font-semibold">
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
      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md w-80">
            {/* Product Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedProduct.productName}
            </h3>

            {/* Product Description */}
            <p className="text-sm text-gray-600 mb-3">
              {selectedProduct.description}
            </p>

            {/* Product Image */}
            <img
              src={selectedProduct.productImageUrl}
              alt={selectedProduct.productName}
              className="w-full h-28 object-cover rounded-md mb-3"
            />

            {/* Product Price */}
            <div className="text-lg font-medium text-gray-800 mb-3">
              Price: ₹{selectedProduct.productPrice}
            </div>

            {/* Additional Details */}
            <div className="mb-2">
              <span className="font-medium text-sm text-gray-700">
                Seller ID:
              </span>
              <p className="text-sm text-gray-600">
                {selectedProduct.seller.substring(0, 5)}
              </p>
            </div>
            <div className="mb-2">
              <span className="font-medium text-sm text-gray-700">
                Packed Date:
              </span>
              <p className="text-sm text-gray-600">
                {selectedProduct.createdDate}
              </p>
            </div>
            <div className="mb-2">
              <span className="font-medium text-sm text-gray-700">
                Expiry Date:
              </span>
              <p className="text-sm text-gray-600">
                {selectedProduct.expiryDate}
              </p>
            </div>

            {/* Quantity Input */}
            <div className="mb-3">
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                onChange={(e) => setquantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                min={1}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between space-x-3">
              {/* Add to Cart */}
              <Button
                variant="default"
                className="w-1/2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md"
                onClick={async () => {
                  await handleAddToCart(selectedProduct, quantity);
                  setModalOpen(false); // Close modal on success
                }}
              >
                Add to Cart
              </Button>

              {/* Buy Now */}
             
            </div>

            {/* Close Button */}
            <div className="mt-3 text-center">
              <Button
                variant="destructive"
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
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
