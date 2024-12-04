import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, BrowserProvider, Contract } from "ethers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sprout, Store, Lock, Mail } from "lucide-react";
import {
  FarmerOperationsManagement,
  BuyerOperationsManagement,
  FARMER_ABI,
  BUYER_ABI,
} from "@/lib/contractaddress";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isFarmer: false,
  });
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleMetaMaskCheck = async () => {
    if (!window.ethereum) {
      alert(
        "MetaMask is required for login. Please install MetaMask and try again."
      );
      throw new Error("MetaMask not found.");
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const handleSecureLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if MetaMask is available
      await handleMetaMaskCheck();

      // Create the provider and signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Select contract based on role
      const contractAddress = loginData.isFarmer
        ? FarmerOperationsManagement
        : BuyerOperationsManagement;
      const contractABI = loginData.isFarmer ? FARMER_ABI : BUYER_ABI;
      const contract = new Contract(contractAddress, contractABI, signer);

      // Select login function based on role
      const loginFunction = loginData.isFarmer
        ? contract.FarmerLogin
        : contract.BuyerLogin;

      // Event names based on role
      const successEvent = loginData.isFarmer
        ? "LoginSuccessful"
        : "BuyerLoginSuccessful";
      const failureEvent = loginData.isFarmer
        ? "LoginFailed"
        : "BuyerLoginFailed";

      // Attach event listeners for login success and failure
      contract.on(successEvent, (userEmail) => {
        console.log(`${successEvent} event:`, userEmail);
        alert(`Login successful: ${userEmail}`);

        // Store user details in localStorage
        localStorage.setItem("userEmail", loginData.email);
        localStorage.setItem(
          "userRole",
          loginData.isFarmer ? "farmer" : "buyer"
        );

        // Call the login handler from context
        handleLogin()
          .then((res) => {
            if (res) {
              navigate("/admin");
            } else {
              alert("Unable to create session due to a server issue");
            }
          })
          .catch((err) => {
            console.error("Error creating session:", err);
            alert("Failed to create session. Please try again.");
          })
          .finally(() => {
            setLoading(false); // Stop the loader
          });
      });

      contract.on(failureEvent, (reason) => {
        console.error(`${failureEvent} event:`, reason);
        alert(`Login failed: ${reason}`);
        setLoading(false); // Stop the loader
      });

      // Initiating the login function and waiting for the transaction to be mined
      const tx = await loginFunction(loginData.email, loginData.password);
      await tx.wait();
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An error occurred during login. Please try again.");
      setLoading(false); // Ensure loader is stopped on error
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-2">
      <div className="w-full max-w-7xl px-2 py-4">
        <div className="text-center">
          <div className="mb-3">
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Direct Market Access
            </h1>
            <p className="text-lg text-green-700 max-w-md mx-auto">
              Connect farmers directly with customers. Fresh produce, fair
              prices, no middlemen.
            </p>
          </div>

          <Card className="w-full max-w-md border-green-200 bg-white/90 backdrop-blur shadow-md mb-8 mx-auto">
            <CardHeader className="text-center border-b border-green-100 bg-green-50/50">
              <CardTitle className="text-2xl font-bold text-green-800">
                Login
              </CardTitle>
              <CardDescription className="text-green-600">
                Access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSecureLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10 border-green-200 focus:ring-green-500"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
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
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button
                      type="button"
                      className={`flex-1 ${
                        loginData.isFarmer
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-800"
                      }`}
                      onClick={() =>
                        setLoginData({ ...loginData, isFarmer: true })
                      }
                    >
                      <Sprout className="w-4 h-4 mr-2" />
                      I'm a Farmer
                    </Button>
                    <Button
                      type="button"
                      className={`flex-1 ${
                        !loginData.isFarmer
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-800"
                      }`}
                      onClick={() =>
                        setLoginData({ ...loginData, isFarmer: false })
                      }
                    >
                      <Store className="w-4 h-4 mr-2" />
                      I'm a Customer
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <p>loading...</p> // Display loader if loading
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
              <div className="text-center mt-4">
                <p className="text-sm text-green-600">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-green-800 font-semibold hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-3 lg:grid lg:grid-cols-3 gap-4 max-w-4xl w-full mx-auto hidden lg:block">
          <Card className="bg-white/80 shadow-md">
            <CardContent className="pt-6 text-center">
              <Sprout className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">For Farmers</h3>
              <p className="text-sm text-green-600">
                Sell directly to customers and earn more
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 shadow-md">
            <CardContent className="pt-6 text-center">
              <Store className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">For Customers</h3>
              <p className="text-sm text-green-600">
                Get fresh produce at better prices
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 shadow-md">
            <CardContent className="pt-6 text-center">
              <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Secure Platform</h3>
              <p className="text-sm text-green-600">
                Safe and transparent transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
