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
    event ByerSignupSuccessful(string buyerName, string message);

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

        BuyerLoginSignup[msg.sender] = Buyer({
            name: _name,
            email: _email,
            number: _number,
            password: _password
        });

        emit ByerSignupSuccessful(_name, "Signup successful");
    }

    function BuyerLogin(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(
            bytes(_email).length > 0 && bytes(_password).length > 0,
            "Invalid data provided for Login"
        );

        if (
            keccak256(abi.encodePacked(BuyerLoginSignup[msg.sender].email)) ==
            keccak256(abi.encodePacked(_email))
        ) {
            if (
                keccak256(
                    abi.encodePacked(BuyerLoginSignup[msg.sender].password)
                ) == keccak256(abi.encodePacked(_password))
            ) {
                return true;
            } else {
                revert("Incorrect password");
            }
        } else {
            revert("Email not found");
        }
    }
}
