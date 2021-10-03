const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 =
{
   "chain": [
     {
       "index": 1,
       "timestamp": 1633288049672,
       "transactions": [
         
       ],
       "nonce": 100,
       "hash": "0",
       "previousBlockHash": "0"
     },
     {
       "index": 2,
       "timestamp": 1633288063988,
       "transactions": [
         
       ],
       "nonce": 18140,
       "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
       "previousBlockHash": "0"
     },
     {
       "index": 3,
       "timestamp": 1633288119139,
       "transactions": [
         {
           "amount": 12.5,
           "sender": "00",
           "transactionId": "303c1a80247d11eca4097363301493db"
         },
         {
           "amount": 10,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "412af910247d11eca4097363301493db"
         },
         {
           "amount": 20,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "459494c0247d11eca4097363301493db"
         },
         {
           "amount": 30,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "49fc0d90247d11eca4097363301493db"
         }
       ],
       "nonce": 46455,
       "hash": "0000d936dec89f498885d52b97363d3e5807aa4eeb846b1d3f5e391ddb7d9821",
       "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
     },
     {
       "index": 4,
       "timestamp": 1633288160001,
       "transactions": [
         {
           "amount": 12.5,
           "sender": "00",
           "transactionId": "51144e80247d11eca4097363301493db"
         },
         {
           "amount": 40,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "5e9e3020247d11eca4097363301493db"
         },
         {
           "amount": 50,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "607ed700247d11eca4097363301493db"
         },
         {
           "amount": 60,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "62872a20247d11eca4097363301493db"
         },
         {
           "amount": 70,
           "sender": "HGA8ED0SGH90A5WHET",
           "recipient": "54WHTEJSRTJ53WJA46",
           "transactionId": "64f20fa0247d11eca4097363301493db"
         }
       ],
       "nonce": 102881,
       "hash": "0000cfdb8e7333bfde52ebfbbc3710060d3a964c78a3282a837cca4d3e8214fc",
       "previousBlockHash": "0000d936dec89f498885d52b97363d3e5807aa4eeb846b1d3f5e391ddb7d9821"
     },
     {
       "index": 5,
       "timestamp": 1633288179987,
       "transactions": [
         {
           "amount": 12.5,
           "sender": "00",
           "transactionId": "696f5a60247d11eca4097363301493db"
         }
       ],
       "nonce": 26340,
       "hash": "0000bc67c2155736f4ff0d52eeec9fbd6e72a3d6dc5848550abd89be2988310e",
       "previousBlockHash": "0000cfdb8e7333bfde52ebfbbc3710060d3a964c78a3282a837cca4d3e8214fc"
     },
     {
       "index": 6,
       "timestamp": 1633288186759,
       "transactions": [
         {
           "amount": 12.5,
           "sender": "00",
           "transactionId": "7558d270247d11eca4097363301493db"
         }
       ],
       "nonce": 233337,
       "hash": "0000614360dbc11ce531211fbfa321711e60306dfafce7c71d3dec694debfd58",
       "previousBlockHash": "0000bc67c2155736f4ff0d52eeec9fbd6e72a3d6dc5848550abd89be2988310e"
     }
   ],
   "pendingTransactions": [
     {
       "amount": 12.5,
       "sender": "00",
       "transactionId": "79624cc0247d11eca4097363301493db"
     }
   ],
   "currentNodeUrl": "http://localhost:3001",
   "networkNodes": [
     
   ]
};

console.log('VALID:', bitcoin.chainIsValid(bc1.chain));

// console.log(bitcoin);

// const previousBlockHash = 'SDFGHHSD435Y24H24HGDSFH';
// const currentBlockData = [
//    {
//       amount: 10,
//       sender: 'HGVHVJ876598HJKVK',
//       recipient: '97GDSAFUBSAGDIF'
//    },
//    {
//       amount: 30,
//       sender: '97GDSAFUBSAGDIF',
//       recipient: 'OKAJSGD97ADFUGASD'
//    },
//    {
//       amount: 50,
//       sender: 'LJHASD8FG8SADGFB',
//       recipient: 'GKJASD8F7G08SADGF'
//    }
// ];
// const nonce = 100;

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData)); // returns nonce = 28085
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 28085));


// bitcoin.createNewBlock(2435, '1U3G8T41038', '93FSEJGF983');

// bitcoin.createNewTransaction(100, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

// bitcoin.createNewBlock(1113, '93FSEJGF983', 'JNAWESFBDRG');

// bitcoin.createNewTransaction(50, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
// bitcoin.createNewTransaction(300, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
// bitcoin.createNewTransaction(200, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

// bitcoin.createNewBlock(2753, 'JNAWESFBDRG', 'A8WSAHSVDFH');

// console.log(bitcoin.chain[2]);
