// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./FarmerSignupLoginContract.sol";

contract FarmerOperationsManagement is FarmerSignupLoginContract {
    struct ProductPurchase {
        string buyerName;
        address buyerAddress;
        string userPhoneNo;
        string status;
        string userAddress;
        uint productid;
        uint orderid;
        string productImageUrl; // New field added
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
        uint totalpurchaseamount;
    }

    mapping(address => Product[]) public farmerProducts;
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

    // Function for farmers to add a product
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
            averageRating: 0,
            totalpurchaseamount: 0
        });

        farmerProducts[msg.sender].push(newProduct);
        allListedProducts.push(newProduct);

        emit ProductAdded(msg.sender, productId, _productName);
    }

    // Update the total purchase amount for a product
    function updateTotalPurchaseAmount(
        address _farmerAddress,
        uint _productId,
        uint _amount
    ) public {
        require(
            _productId < farmerProducts[_farmerAddress].length,
            "Product does not exist"
        );

        farmerProducts[_farmerAddress][_productId]
            .totalpurchaseamount += _amount;

        // Also update the totalpurchaseamount in the allListedProducts array
        for (uint i = 0; i < allListedProducts.length; i++) {
            if (
                allListedProducts[i].creator == _farmerAddress &&
                allListedProducts[i].productId == _productId
            ) {
                allListedProducts[i].totalpurchaseamount += _amount;
                break;
            }
        }
    }

    // Function for buyers to add purchase details
    function addPurchase(
        address _farmerAddress,
        uint _productId,
        string memory _buyerName,
        string memory _status,
        string memory _userAddress,
        string memory _userPhoneNo,
        uint productid,
        string memory _productImageUrl // New parameter added
    ) public {
        require(
            _productId < farmerProducts[_farmerAddress].length,
            "Product does not exist for this farmer"
        );

        uint orderid = farmerProductPurchases[_farmerAddress][_productId]
            .length;

        farmerProductPurchases[_farmerAddress][_productId].push(
            ProductPurchase({
                buyerName: _buyerName,
                buyerAddress: msg.sender,
                status: _status,
                userAddress: _userAddress,
                userPhoneNo: _userPhoneNo,
                productid: productid,
                orderid: orderid,
                productImageUrl: _productImageUrl // Added new field
            })
        );

        emit OrderReceived(_farmerAddress, _productId, msg.sender);
    }

    // Function to retrieve all products of a specific farmer
    function getFarmerProducts(
        address _farmerAddress
    ) public view returns (Product[] memory) {
        return farmerProducts[_farmerAddress];
    }

    // Function to retrieve a list of all registered farmers
    function getAllFarmers() public view returns (address[] memory) {
        return registeredFarmers;
    }

    // Function to retrieve all products of the caller farmer
    function getMyProducts() public view returns (Product[] memory) {
        return farmerProducts[msg.sender];
    }

    // Function to retrieve all orders for the caller farmer's products
    function getMyProductOrders()
        public
        view
        returns (ProductPurchase[] memory)
    {
        uint totalOrders = 0;

        for (uint i = 0; i < farmerProducts[msg.sender].length; i++) {
            totalOrders += farmerProductPurchases[msg.sender][i].length;
        }

        ProductPurchase[] memory allOrders = new ProductPurchase[](totalOrders);
        uint index = 0;

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

    // Function for buyers to get all listed products
    function getAllListedProducts() public view returns (Product[] memory) {
        return allListedProducts;
    }

    // Function for buyers to get purchase details for a specific product
    function getPurchaseDetails(
        address _farmerAddress,
        uint _productId
    ) public view returns (ProductPurchase memory) {
        ProductPurchase[] memory purchases = farmerProductPurchases[
            _farmerAddress
        ][_productId];

        for (uint i = 0; i < purchases.length; i++) {
            if (purchases[i].buyerAddress == msg.sender) {
                return purchases[i];
            }
        }

        revert("No purchase record found for this buyer and product");
    }

    // Function for farmers to update order status
    function updateOrderStatus(
        uint _productId,
        uint _orderIndex,
        string memory _status
    ) public {
        require(
            keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("Delivered")),
            "Invalid status update"
        );
        require(
            _orderIndex < farmerProductPurchases[msg.sender][_productId].length,
            "Invalid order index"
        );

        farmerProductPurchases[msg.sender][_productId][_orderIndex]
            .status = _status;
    }
}
