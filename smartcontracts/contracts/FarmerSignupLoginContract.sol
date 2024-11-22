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
    event SignupSuccessful(string farmerName, string message);

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

        FarmerLoginSignup[msg.sender] = Farmer({
            name: _name,
            email: _email,
            number: _number,
            password: _password
        });

        emit SignupSuccessful(_name, "Signup successful");
    }
    function FarmerLogin(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(
            bytes(_email).length > 0 && bytes(_password).length > 0,
            "Invalid data provided for Login"
        );

        if (
            keccak256(abi.encodePacked(FarmerLoginSignup[msg.sender].email)) ==
            keccak256(abi.encodePacked(_email))
        ) {
            if (
                keccak256(
                    abi.encodePacked(FarmerLoginSignup[msg.sender].password)
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
