// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract BuyerSignupLoginContract {
    struct Buyer {
        string name;
        string email;
        string number;
        string password;
    }

    mapping(address => Buyer) public BuyerLoginSignup;

    // Events for different scenarios
    event BuyerSignupSuccessful(string buyerName, string message);
    event BuyerSignupFailed(string reason, address userAddress);
    event BuyerLoginFailed(string reason, address userAddress);
    event BuyerLoginSuccessful(
        string buyerName,
        address userAddress,
        string phonenum
    ); // New event for successful login

    // Signup function
    function buyerSignup(
        string memory _name,
        string memory _email,
        string memory _number,
        string memory _password
    ) public {
        require(
            bytes(_name).length > 0 &&
                bytes(_email).length > 0 &&
                bytes(_password).length > 0 &&
                bytes(_number).length > 0,
            "Invalid data provided for signup"
        );

        // Check if the sender address already exists
        if (bytes(BuyerLoginSignup[msg.sender].email).length > 0) {
            emit BuyerSignupFailed(
                "User with this MetaMask ID already exists. Please use the existing account or update details.",
                msg.sender
            );
            return;
        }

        // Check if the email is already associated with another address
        if (
            keccak256(abi.encodePacked(BuyerLoginSignup[msg.sender].email)) ==
            keccak256(abi.encodePacked(_email))
        ) {
            emit BuyerSignupFailed(
                "Email already in use. Please use a different email.",
                msg.sender
            );
            return;
        }

        // Add the buyer details to the mapping
        BuyerLoginSignup[msg.sender] = Buyer({
            name: _name,
            email: _email,
            number: _number,
            password: _password
        });

        emit BuyerSignupSuccessful(_name, "Signup successful");
    }

    // Login function
    function BuyerLogin(string memory _email, string memory _password) public {
        require(
            bytes(_email).length > 0 && bytes(_password).length > 0,
            "Invalid data provided for login"
        );

        // Check if the email matches
        if (
            keccak256(abi.encodePacked(BuyerLoginSignup[msg.sender].email)) !=
            keccak256(abi.encodePacked(_email))
        ) {
            emit BuyerLoginFailed("Email not found", msg.sender);
            return;
        }

        // Check if the password matches
        if (
            keccak256(
                abi.encodePacked(BuyerLoginSignup[msg.sender].password)
            ) != keccak256(abi.encodePacked(_password))
        ) {
            emit BuyerLoginFailed("Incorrect password", msg.sender);
            return;
        }

        emit BuyerLoginSuccessful(
            BuyerLoginSignup[msg.sender].name,
            msg.sender,
            BuyerLoginSignup[msg.sender].number
        );
    }
}
