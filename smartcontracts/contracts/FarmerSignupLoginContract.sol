// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract FarmerSignupLoginContract {
    struct Farmer {
        string name;
        string email;
        string number;
        string password;
    }

    mapping(address => Farmer) public FarmerLoginSignup;

    // Events for different scenarios
    event SignupSuccessful(string farmerName, string message);
    event SignupFailed(string reason, address userAddress);
    event LoginFailed(string reason, address userAddress);
    event LoginSuccessful(string buyerName, address userAddress, string phone);

    // Signup function
    function farmerSignup(
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
        if (bytes(FarmerLoginSignup[msg.sender].email).length > 0) {
            emit SignupFailed(
                "User with this MetaMask ID already exists. Please use the existing account or update details.",
                msg.sender
            );
            return;
        }

        // Check if the email is already associated with another address
        if (
            keccak256(abi.encodePacked(FarmerLoginSignup[msg.sender].email)) ==
            keccak256(abi.encodePacked(_email))
        ) {
            emit SignupFailed(
                "Email already in use. Please use a different email.",
                msg.sender
            );
            return;
        }

        // Add the farmer details to the mapping
        FarmerLoginSignup[msg.sender] = Farmer({
            name: _name,
            email: _email,
            number: _number,
            password: _password
        });

        emit SignupSuccessful(_name, "Signup successful");
    }

    // Login function
   function FarmerLogin(string memory _email, string memory _password) public {
    require(
        bytes(_email).length > 0 && bytes(_password).length > 0,
        "Invalid data provided for login"
    );

    // Check if the email matches
    if (
        keccak256(abi.encodePacked(FarmerLoginSignup[msg.sender].email)) !=
        keccak256(abi.encodePacked(_email))
    ) {
        emit LoginFailed("Email not found", msg.sender);
        return; // Exit the function early if the email doesn't match
    }

    // Check if the password matches
    if (
        keccak256(abi.encodePacked(FarmerLoginSignup[msg.sender].password)) !=
        keccak256(abi.encodePacked(_password))
    ) {
        emit LoginFailed("Incorrect password", msg.sender);
        return; // Exit the function early if the password doesn't match
    }

    // Emit success only when both email and password match
    emit LoginSuccessful(
        FarmerLoginSignup[msg.sender].name,
        msg.sender,
        FarmerLoginSignup[msg.sender].number
    );
}
}
