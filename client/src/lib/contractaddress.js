const FarmerOperationsManagement = "0x646D8f79645D5bf574A807130b0acba4627aDD7a";

const BuyerOperationsManagement = "0x6F61a2c4deA7cC4b7be0389427EdDeae972E0105";

const FARMER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "LoginFailed",
    type: "event",
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
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "phone",
        type: "string",
      },
    ],
    name: "LoginSuccessful",
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
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "SignupFailed",
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
      {
        internalType: "uint256",
        name: "totalpurchaseamount",
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
        name: "userPhoneNo",
        type: "string",
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
        internalType: "uint256",
        name: "productid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "orderid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productImageUrl",
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
      {
        internalType: "uint256",
        name: "totalpurchaseamount",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateTotalPurchaseAmount",
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
        name: "_userPhoneNo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "productid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_productImageUrl",
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
          {
            internalType: "uint256",
            name: "totalpurchaseamount",
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
          {
            internalType: "uint256",
            name: "totalpurchaseamount",
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
            name: "userPhoneNo",
            type: "string",
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
            internalType: "uint256",
            name: "productid",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productImageUrl",
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
          {
            internalType: "uint256",
            name: "totalpurchaseamount",
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
    name: "getPurchaseDetails",
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
            name: "userPhoneNo",
            type: "string",
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
            internalType: "uint256",
            name: "productid",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "orderid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productImageUrl",
            type: "string",
          },
        ],
        internalType: "struct FarmerOperationsManagement.ProductPurchase",
        name: "",
        type: "tuple",
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
        name: "_productId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_orderIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_status",
        type: "string",
      },
    ],
    name: "updateOrderStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const BUYER_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "farmerContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "reason",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "BuyerLoginFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "buyerName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "phonenum",
          "type": "string"
        }
      ],
      "name": "BuyerLoginSuccessful",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "reason",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "BuyerSignupFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "buyerName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "BuyerSignupSuccessful",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "BuyerLogin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "BuyerLoginSignup",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "number",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "buyerCart",
      "outputs": [
        {
          "internalType": "address",
          "name": "farmerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imgurl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalprice",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "buyerPurchaseHistory",
      "outputs": [
        {
          "internalType": "address",
          "name": "farmerAddress",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "productName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "productPrice",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productImageUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "productPackedDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productExpire",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "ratingsCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "averageRating",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalpurchaseamount",
              "type": "uint256"
            }
          ],
          "internalType": "struct FarmerOperationsManagement.Product",
          "name": "productDetails",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalprice",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "productImageUrl",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_number",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "buyerSignup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "farmerContract",
      "outputs": [
        {
          "internalType": "contract FarmerOperationsManagement",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "farmerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imgurl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "addToCart",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "removeFromCart",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyCartItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "farmerAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "imgurl",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalprice",
              "type": "uint256"
            }
          ],
          "internalType": "struct BuyerOperationsManagement.CartItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "buyerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "userAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "userPhoneNo",
          "type": "string"
        }
      ],
      "name": "purchaseCart",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "buyerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "userAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "userPhoneNo",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        }
      ],
      "name": "purchaseSingleProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPurchaseHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "farmerAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "productId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "productName",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "productPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "productType",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "productImageUrl",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "productPackedDate",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "productExpire",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "ratingsCount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "averageRating",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "totalpurchaseamount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct FarmerOperationsManagement.Product",
              "name": "productDetails",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalprice",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "productImageUrl",
              "type": "string"
            }
          ],
          "internalType": "struct BuyerOperationsManagement.PurchasedProduct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

export {
  FarmerOperationsManagement,
  BuyerOperationsManagement,
  FARMER_ABI,
  BUYER_ABI,
};
