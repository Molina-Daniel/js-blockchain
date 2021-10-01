const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const previousBlockHash = 'SDFGHHSD435Y24H24HGDSFH';
const currentBlockData = [
   {
      amount: 10,
      sender: 'HGVHVJ876598HJKVK',
      recipient: '97GDSAFUBSAGDIF'
   },
   {
      amount: 30,
      sender: '97GDSAFUBSAGDIF',
      recipient: 'OKAJSGD97ADFUGASD'
   },
   {
      amount: 50,
      sender: 'LJHASD8FG8SADGFB',
      recipient: 'GKJASD8F7G08SADGF'
   }
];
// const nonce = 100;

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData)); // returns nonce = 28085
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 28085));


// bitcoin.createNewBlock(2435, '1U3G8T41038', '93FSEJGF983');

// bitcoin.createNewTransaction(100, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

// bitcoin.createNewBlock(1113, '93FSEJGF983', 'JNAWESFBDRG');

// bitcoin.createNewTransaction(50, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
// bitcoin.createNewTransaction(300, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
// bitcoin.createNewTransaction(200, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

// bitcoin.createNewBlock(2753, 'JNAWESFBDRG', 'A8WSAHSVDFH');

// console.log(bitcoin);
// console.log(bitcoin.chain[2]);
