// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./FarmerOperationsManagement.sol";
import "./BuyerSignupLoginContract.sol";

contract BuyerOperationsManagement is BuyerSignupLoginContract {
    FarmerOperationsManagement public farmerContract;

    struct CartItem {
        address farmerAddress;
        uint productId;
        string imgurl;
        uint quantity;
        uint price;
        uint totalprice;
    }

    struct PurchasedProduct {
        address farmerAddress;
        FarmerOperationsManagement.Product productDetails;
        uint quantity;
        uint totalprice;
        string productImageUrl; // Include product image URL in purchase details
    }

    mapping(address => CartItem[]) public buyerCart;
    mapping(address => PurchasedProduct[]) public buyerPurchaseHistory;

    constructor(address farmerContractAddress) {
        farmerContract = FarmerOperationsManagement(farmerContractAddress);
    }

    // Add items to cart
    function addToCart(
        address farmerAddress,
        uint productId,
        string memory imgurl,
        uint quantity,
        uint price
    ) public {
        require(
            productId < farmerContract.getFarmerProducts(farmerAddress).length,
            "Invalid product"
        );
        require(quantity > 0, "Quantity must be greater than 0");

        CartItem[] storage cart = buyerCart[msg.sender];

        for (uint i = 0; i < cart.length; i++) {
            if (
                cart[i].productId == productId &&
                cart[i].farmerAddress == farmerAddress
            ) {
                cart[i].quantity += quantity;
                cart[i].totalprice += price * quantity;
                return;
            }
        }

        cart.push(
            CartItem({
                farmerAddress: farmerAddress,
                productId: productId,
                imgurl: imgurl,
                quantity: quantity,
                price: price,
                totalprice: price * quantity
            })
        );
    }

    // Remove item from cart
    function removeFromCart(uint index) public {
        require(index < buyerCart[msg.sender].length, "Invalid cart index");

        CartItem[] storage cart = buyerCart[msg.sender];
        cart[index] = cart[cart.length - 1];
        cart.pop();
    }

    // Get all cart items
    function getMyCartItems() public view returns (CartItem[] memory) {
        return buyerCart[msg.sender];
    }

    // Purchase all cart items
    function purchaseCart(
        string memory buyerName,
        string memory userAddress,
        string memory userPhoneNo
    ) public {
        CartItem[] storage cart = buyerCart[msg.sender];
        require(cart.length > 0, "Cart is empty");

        for (uint i = 0; i < cart.length; i++) {
            CartItem memory item = cart[i];

            // Retrieve the product details from the FarmerOperationsManagement contract
            FarmerOperationsManagement.Product memory product = farmerContract
                .getFarmerProducts(item.farmerAddress)[item.productId];

            // Update the total purchase amount for the product
            farmerContract.updateTotalPurchaseAmount(
                item.farmerAddress,
                item.productId,
                item.totalprice
            );

            // Add to purchase history
            buyerPurchaseHistory[msg.sender].push(
                PurchasedProduct({
                    farmerAddress: item.farmerAddress,
                    productDetails: product,
                    quantity: item.quantity,
                    totalprice: item.totalprice,
                    productImageUrl: item.imgurl // Set the image URL in the purchase history
                })
            );

            // Add purchase to farmer's records
            farmerContract.addPurchase(
                item.farmerAddress,
                item.productId,
                buyerName,
                "pending delivery",
                userAddress,
                userPhoneNo,
                item.productId,
                item.imgurl // Include product image URL in the purchase record
            );
        }

        // Clear cart after purchase
        delete buyerCart[msg.sender];
    }

    // Purchase a single product
    function purchaseSingleProduct(
        uint index,
        string memory buyerName,
        string memory userAddress,
        string memory userPhoneNo,
        uint productid
    ) public {
        require(index < buyerCart[msg.sender].length, "Invalid cart index");

        CartItem[] storage cart = buyerCart[msg.sender];
        CartItem memory item = cart[index];

        // Retrieve the product details from the FarmerOperationsManagement contract
        FarmerOperationsManagement.Product memory product = farmerContract
            .getFarmerProducts(item.farmerAddress)[item.productId];

        // Update the total purchase amount for the product
        farmerContract.updateTotalPurchaseAmount(
            item.farmerAddress,
            item.productId,
            item.totalprice
        );

        // Add to purchase history
        buyerPurchaseHistory[msg.sender].push(
            PurchasedProduct({
                farmerAddress: item.farmerAddress,
                productDetails: product,
                quantity: item.quantity,
                totalprice: item.totalprice,
                productImageUrl: item.imgurl // Set the image URL in the purchase history
            })
        );

        // Add purchase to farmer's records
        farmerContract.addPurchase(
            item.farmerAddress,
            item.productId,
            buyerName,
            "pending delivery",
            userAddress,
            userPhoneNo,
            productid,
            item.imgurl // Include product image URL in the purchase record
        );

        // Remove the purchased item from the cart
        cart[index] = cart[cart.length - 1];
        cart.pop();
    }

    // Get buyer's purchase history
    function getPurchaseHistory()
        public
        view
        returns (PurchasedProduct[] memory)
    {
        return buyerPurchaseHistory[msg.sender];
    }
}
