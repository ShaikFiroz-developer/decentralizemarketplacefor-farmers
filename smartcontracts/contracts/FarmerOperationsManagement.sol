// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./FarmerSignupLoginContract.sol";

contract FarmerOperationsManagement is FarmerSignupLoginContract {
    struct ProductPurchase {
        string buyerName;
        address buyerAddress;
        string status;
        string userAddress;
        string userId;
        string userPhoneNo;
        string walletAddress;
    }

    struct Product {
        uint productId;
        string productName;
        uint productPrice;
        string description;
        string productType;
        string productImageUrl;
        address creator;
        string productPackedDate;
        string productExpire;
        uint ratingsCount;
        uint averageRating;
    }

    // Mapping to store products of a farmer
    mapping(address => Product[]) public farmerProducts;

    // List of all products for buyers
    Product[] public allListedProducts;

    mapping(address => mapping(uint => ProductPurchase[]))
        public farmerProductPurchases;

    address[] public registeredFarmers;

    event ProductAdded(
        address indexed farmer,
        uint productId,
        string productName
    );
    event OrderReceived(address indexed farmer, uint productId, address buyer);

    function addProduct(
        string memory _productName,
        uint _productPrice,
        string memory _description,
        string memory _productType,
        string memory _productImageUrl,
        string memory _productPackedDate,
        string memory _productExpire
    ) public {
        require(bytes(_productName).length > 0, "Product name is required");
        require(_productPrice > 0, "Product price must be greater than zero");

        if (farmerProducts[msg.sender].length == 0) {
            registeredFarmers.push(msg.sender);
        }

        uint productId = farmerProducts[msg.sender].length;

        Product memory newProduct = Product({
            productId: productId,
            productName: _productName,
            productPrice: _productPrice,
            description: _description,
            productType: _productType,
            productImageUrl: _productImageUrl,
            creator: msg.sender,
            productPackedDate: _productPackedDate,
            productExpire: _productExpire,
            ratingsCount: 0,
            averageRating: 0
        });

        farmerProducts[msg.sender].push(newProduct);
        allListedProducts.push(newProduct);

        emit ProductAdded(msg.sender, productId, _productName);
    }

    function addPurchase(
        address _farmerAddress,
        uint _productId,
        string memory _buyerName,
        string memory _status,
        string memory _userAddress,
        string memory _userId,
        string memory _userPhoneNo,
        string memory _walletAddress
    ) public {
        require(
            _productId < farmerProducts[_farmerAddress].length,
            "Product does not exist for this farmer"
        );

        farmerProductPurchases[_farmerAddress][_productId].push(
            ProductPurchase({
                buyerName: _buyerName,
                buyerAddress: msg.sender,
                status: _status,
                userAddress: _userAddress,
                userId: _userId,
                userPhoneNo: _userPhoneNo,
                walletAddress: _walletAddress
            })
        );

        emit OrderReceived(_farmerAddress, _productId, msg.sender);
    }

    function getPurchases(
        address _farmerAddress,
        uint _productId
    ) public view returns (ProductPurchase[] memory) {
        return farmerProductPurchases[_farmerAddress][_productId];
    }

    function getFarmerProducts(
        address _farmerAddress
    ) public view returns (Product[] memory) {
        return farmerProducts[_farmerAddress];
    }

    function getAllFarmers() public view returns (address[] memory) {
        return registeredFarmers;
    }

    // New function: Get all products of the caller
    function getMyProducts() public view returns (Product[] memory) {
        return farmerProducts[msg.sender];
    }

    // New function: Get all orders for all products of the caller
    function getMyProductOrders()
        public
        view
        returns (ProductPurchase[] memory)
    {
        uint totalOrders = 0;

        // Calculate total orders for all products
        for (uint i = 0; i < farmerProducts[msg.sender].length; i++) {
            totalOrders += farmerProductPurchases[msg.sender][i].length;
        }

        // Initialize an array to hold all orders
        ProductPurchase[] memory allOrders = new ProductPurchase[](totalOrders);
        uint index = 0;

        // Populate the orders array
        for (uint i = 0; i < farmerProducts[msg.sender].length; i++) {
            ProductPurchase[] memory orders = farmerProductPurchases[
                msg.sender
            ][i];
            for (uint j = 0; j < orders.length; j++) {
                allOrders[index] = orders[j];
                index++;
            }
        }

        return allOrders;
    }

    // New function: Get all listed products for buyers
    function getAllListedProducts() public view returns (Product[] memory) {
        return allListedProducts;
    }
}
