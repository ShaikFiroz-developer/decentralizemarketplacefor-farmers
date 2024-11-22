// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./FarmerOperationsManagement.sol";
import "./BuyerSignupLoginContract.sol";

contract BuyerOperationsManagement is BuyerSignupLoginContract {
    FarmerOperationsManagement public farmerContract;

    // Struct to represent a CartItem
    struct CartItem {
        uint productId;
        uint quantity;
        address seller;
        string name;
        uint price;
        string imgurl;
    }

    // Mapping to store buyer's cart items
    mapping(address => CartItem[]) public buyerCarts;

    // Mapping to store buyer's orders
    mapping(address => FarmerOperationsManagement.ProductPurchase[])
        public buyerOrders;

    // Mapping to store the status of each order (using orderId as the key)
    mapping(uint => string) public orderStatus;

    mapping(address => uint) public buyerSpentAmount;

    constructor(address farmerContractAddress) {
        farmerContract = FarmerOperationsManagement(farmerContractAddress);
    }

    function getAllFarmersProducts()
        public
        view
        returns (FarmerOperationsManagement.Product[] memory)
    {
        uint totalProducts;
        address[] memory allFarmers = farmerContract.getAllFarmers();

        for (uint i = 0; i < allFarmers.length; i++) {
            totalProducts += farmerContract
                .getFarmerProducts(allFarmers[i])
                .length;
        }

        FarmerOperationsManagement.Product[]
            memory allProducts = new FarmerOperationsManagement.Product[](
                totalProducts
            );
        uint index = 0;

        for (uint i = 0; i < allFarmers.length; i++) {
            FarmerOperationsManagement.Product[]
                memory farmerProducts = farmerContract.getFarmerProducts(
                    allFarmers[i]
                );
            for (uint j = 0; j < farmerProducts.length; j++) {
                allProducts[index] = farmerProducts[j];
                index++;
            }
        }

        return allProducts;
    }

    function addToCart(
        uint productId,
        uint quantity,
        address _seller,
        string memory _name,
        uint _price,
        string memory _imgurl
    ) public {
        require(quantity > 0, "Quantity must be greater than zero");

        address[] memory allFarmers = farmerContract.getAllFarmers();
        bool productFound = false;

        for (uint i = 0; i < allFarmers.length; i++) {
            FarmerOperationsManagement.Product[]
                memory farmerProducts = farmerContract.getFarmerProducts(
                    allFarmers[i]
                );
            for (uint j = 0; j < farmerProducts.length; j++) {
                if (farmerProducts[j].productId == productId) {
                    buyerCarts[msg.sender].push(
                        CartItem({
                            productId: productId,
                            quantity: quantity,
                            seller: _seller,
                            name: _name,
                            price: _price,
                            imgurl: _imgurl
                        })
                    );
                    productFound = true;
                    break;
                }
            }
            if (productFound) break;
        }
        require(productFound, "Product not found");
    }

    function removeFromCart(uint productId, address sellerid) public {
        CartItem[] storage cart = buyerCarts[msg.sender];
        bool productRemoved = false;

        for (uint i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId && cart[i].seller == sellerid) {
                cart[i] = cart[cart.length - 1];
                cart.pop();
                productRemoved = true;
                break;
            }
        }
        require(productRemoved, "Product not found in cart");
    }

    function getCartItems() public view returns (CartItem[] memory) {
        return buyerCarts[msg.sender];
    }

    function getOrders()
        public
        view
        returns (FarmerOperationsManagement.ProductPurchase[] memory)
    {
        return buyerOrders[msg.sender];
    }
    function updateOrderStatus(uint orderId, string memory status) public {
        require(
            keccak256(abi.encodePacked(status)) ==
                keccak256(abi.encodePacked("Delivered")),
            "Status must be 'Delivered'"
        );

        bool isFarmer = false;

        address[] memory allFarmers = farmerContract.getAllFarmers();
        for (uint i = 0; i < allFarmers.length; i++) {
            FarmerOperationsManagement.Product[]
                memory farmerProducts = farmerContract.getFarmerProducts(
                    allFarmers[i]
                );
            for (uint j = 0; j < farmerProducts.length; j++) {
                if (farmerProducts[j].productId == orderId) {
                    isFarmer = true;
                    break;
                }
            }
            if (isFarmer) break;
        }

        require(
            isFarmer,
            "Only the farmer who made the sale can update the order status"
        );

        orderStatus[orderId] = status;
    }

    function getOrderStatus(uint orderId) public view returns (string memory) {
        return orderStatus[orderId];
    }
}
