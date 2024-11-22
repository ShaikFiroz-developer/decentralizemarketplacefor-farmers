const FarmerOperationsManagement = "0x5c5d65F4f07C54C563DF09839d39694EB4Bcc5c7";

const BuyerOperationsManagement = "0x6a8dA5E91ae4F78011343D34Dc45ff644222Fd43";

const FARMER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "farmer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "farmer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productName",
        type: "string",
      },
    ],
    name: "ProductAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "farmerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "SignupSuccessful",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "FarmerLogin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "FarmerLoginSignup",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "string",
        name: "number",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allListedProducts",
    outputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "productPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "productType",
        type: "string",
      },
      {
        internalType: "string",
        name: "productImageUrl",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "productPackedDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "productExpire",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ratingsCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "averageRating",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "farmerProductPurchases",
    outputs: [
      {
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        internalType: "address",
        name: "buyerAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
      {
        internalType: "string",
        name: "userAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "userPhoneNo",
        type: "string",
      },
      {
        internalType: "string",
        name: "walletAddress",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "farmerProducts",
    outputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "productPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "productType",
        type: "string",
      },
      {
        internalType: "string",
        name: "productImageUrl",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "productPackedDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "productExpire",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ratingsCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "averageRating",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_number",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "farmerSignup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "registeredFarmers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_productName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_productPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_productType",
        type: "string",
      },
      {
        internalType: "string",
        name: "_productImageUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "_productPackedDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "_productExpire",
        type: "string",
      },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_buyerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_status",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userPhoneNo",
        type: "string",
      },
      {
        internalType: "string",
        name: "_walletAddress",
        type: "string",
      },
    ],
    name: "addPurchase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
    ],
    name: "getPurchases",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "address",
            name: "buyerAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "string",
            name: "userAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "userId",
            type: "string",
          },
          {
            internalType: "string",
            name: "userPhoneNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "walletAddress",
            type: "string",
          },
        ],
        internalType: "struct FarmerOperationsManagement.ProductPurchase[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmerAddress",
        type: "address",
      },
    ],
    name: "getFarmerProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "productPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "productType",
            type: "string",
          },
          {
            internalType: "string",
            name: "productImageUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "productPackedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "productExpire",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ratingsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageRating",
            type: "uint256",
          },
        ],
        internalType: "struct FarmerOperationsManagement.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllFarmers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getMyProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "productPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "productType",
            type: "string",
          },
          {
            internalType: "string",
            name: "productImageUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "productPackedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "productExpire",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ratingsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageRating",
            type: "uint256",
          },
        ],
        internalType: "struct FarmerOperationsManagement.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getMyProductOrders",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "address",
            name: "buyerAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "string",
            name: "userAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "userId",
            type: "string",
          },
          {
            internalType: "string",
            name: "userPhoneNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "walletAddress",
            type: "string",
          },
        ],
        internalType: "struct FarmerOperationsManagement.ProductPurchase[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllListedProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "productPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "productType",
            type: "string",
          },
          {
            internalType: "string",
            name: "productImageUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "productPackedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "productExpire",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ratingsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageRating",
            type: "uint256",
          },
        ],
        internalType: "struct FarmerOperationsManagement.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const BUYER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "farmerContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "ByerSignupSuccessful",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "BuyerLogin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "BuyerLoginSignup",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "string",
        name: "number",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "buyerCarts",
    outputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imgurl",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "buyerOrders",
    outputs: [
      {
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        internalType: "address",
        name: "buyerAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
      {
        internalType: "string",
        name: "userAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "userPhoneNo",
        type: "string",
      },
      {
        internalType: "string",
        name: "walletAddress",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_number",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "buyerSignup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "buyerSpentAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "farmerContract",
    outputs: [
      {
        internalType: "contract FarmerOperationsManagement",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllFarmersProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "productPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "productType",
            type: "string",
          },
          {
            internalType: "string",
            name: "productImageUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "productPackedDate",
            type: "string",
          },
          {
            internalType: "string",
            name: "productExpire",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ratingsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageRating",
            type: "uint256",
          },
        ],
        internalType: "struct FarmerOperationsManagement.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_imgurl",
        type: "string",
      },
    ],
    name: "addToCart",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sellerid",
        type: "address",
      },
    ],
    name: "removeFromCart",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCartItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "imgurl",
            type: "string",
          },
        ],
        internalType: "struct BuyerOperationsManagement.CartItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getOrders",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "buyerName",
            type: "string",
          },
          {
            internalType: "address",
            name: "buyerAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "string",
            name: "userAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "userId",
            type: "string",
          },
          {
            internalType: "string",
            name: "userPhoneNo",
            type: "string",
          },
          {
            internalType: "string",
            name: "walletAddress",
            type: "string",
          },
        ],
        internalType: "struct FarmerOperationsManagement.ProductPurchase[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "updateOrderStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "getOrderStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
export {
  FarmerOperationsManagement,
  BuyerOperationsManagement,
  FARMER_ABI,
  BUYER_ABI,
};
