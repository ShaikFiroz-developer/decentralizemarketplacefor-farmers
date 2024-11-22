// 2_deploy_contracts.js

const FarmerOperationsManagement = artifacts.require(
  "FarmerOperationsManagement"
);
const BuyerOperationsManagement = artifacts.require(
  "BuyerOperationsManagement"
);

module.exports = async function (deployer) {
  await deployer.deploy(FarmerOperationsManagement);

  const farmerOperationsAddress = FarmerOperationsManagement.address;
  console.log(
    "FarmerOperationsManagement contract deployed at:",
    farmerOperationsAddress
  );

  await deployer.deploy(BuyerOperationsManagement, farmerOperationsAddress);

  const buyerOperationsAddress = BuyerOperationsManagement.address;
  console.log(
    "BuyerOperationsManagement contract deployed at:",
    buyerOperationsAddress
  );
};
