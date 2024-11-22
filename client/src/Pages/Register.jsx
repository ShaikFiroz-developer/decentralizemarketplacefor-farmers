import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserProvider, Contract, ethers } from "ethers";
import { getContract } from "@/lib/etherjssetusp";
import {
  BUYER_ABI,
  FARMER_ABI,
  FarmerOperationsManagement,
  BuyerOperationsManagement,
} from "@/lib/contractaddress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  Lock,
  Sprout,
  Store,
  CreditCard,
  Home,
} from "lucide-react";

const Register = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    isFarmer: false,
    walletAddress: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleMetaMaskCheck = async () => {
    if (!window.ethereum) {
      alert(
        "MetaMask is required for signup. Please install MetaMask and try again."
      );
      throw new Error("MetaMask not found.");
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const handleSecureSignup = async (e) => {
    e.preventDefault();

    try {
      await handleMetaMaskCheck();

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setSignupData({ ...signupData, walletAddress });

      const contractAddress = signupData.isFarmer
        ? FarmerOperationsManagement
        : BuyerOperationsManagement;
      const contractABI = signupData.isFarmer ? FARMER_ABI : BUYER_ABI;
      const contract = new Contract(contractAddress, contractABI, signer);
      console.log(contract);
      let tx;
      // Only send the necessary fields for signup
      if (signupData.isFarmer) {
        tx = await contract.farmerSignup(
          signupData.fullname,
          signupData.email,
          signupData.phoneNumber,
          signupData.password // Send password to the contract (if necessary)
        );
      } else {
        tx = await contract.buyerSignup(
          signupData.fullname,
          signupData.email,
          signupData.phoneNumber,
          signupData.password // Send password to the contract (if necessary)
        );
      }

      await tx.wait();

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col lg:grid lg:grid-cols-2 gap-8 p-4">
      {/* Left Side */}
      <div className="lg:flex lg:flex-col lg:justify-center lg:items-start lg:px-8">
        <div className="mb-8 text-center lg:text-left lg:w-1/2 mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Direct Market Access
          </h1>
          <p className="text-lg text-green-700 max-w-md mx-auto lg:mx-0">
            Connect farmers directly with customers. Fresh produce, fair prices,
            no middlemen.
          </p>
        </div>
      </div>

      {/* Signup Card */}
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-md border-green-200 bg-white/90 backdrop-blur shadow-md">
          <CardHeader className="text-center border-b border-green-100 bg-green-50/50">
            <CardTitle className="text-2xl font-bold text-green-800">
              Securely Signup with MetaMask
            </CardTitle>
            <CardDescription className="text-green-600">
              Create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSecureSignup} className="space-y-4">
              {/* Input Fields */}
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-10 border-green-200 focus:ring-green-500"
                  value={signupData.fullname}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 border-green-200 focus:ring-green-500"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="pl-10 border-green-200 focus:ring-green-500"
                  value={signupData.phoneNumber}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 border-green-200 focus:ring-green-500"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className={`flex-1 ${
                    signupData.isFarmer
                      ? "bg-green-600"
                      : "bg-green-100 text-green-800"
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, isFarmer: true })
                  }
                >
                  <Sprout className="w-4 h-4 mr-2" />
                  I'm a Farmer
                </Button>
                <Button
                  type="button"
                  className={`flex-1 ${
                    !signupData.isFarmer
                      ? "bg-green-600"
                      : "bg-green-100 text-green-800"
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, isFarmer: false })
                  }
                >
                  <Store className="w-4 h-4 mr-2" />
                  I'm a Customer
                </Button>
              </div>
              <Button type="submit" className="w-full bg-green-600 text-white">
                Securely Signup with MetaMask
              </Button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-green-600">
                Already have an account?
                <a
                  href="/login"
                  className="text-green-800 font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
