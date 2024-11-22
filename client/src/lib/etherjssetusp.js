import { BrowserProvider, Contract } from "ethers";

export const getContract = async (contractAddress, contractABI) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(contractAddress, contractABI, signer);
};
