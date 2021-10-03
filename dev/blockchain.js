const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid').v1;

function Blockchain() {
   this.chain = []; // Stores all the blocks that we create and mine
   this.pendingTransactions = []; // Stores all the new transactions created before they're placed into a block and mined

   this.currentNodeUrl = currentNodeUrl;
   this.networkNodes = []; // We'll fill this array with all the URLs connected to the Network

   this.createNewBlock(100, '0', '0'); // This will generate the first block of our blockchain, a.k.a. 'genesis block'
}

// If we'd want to do the same with a JS class instead of a construction function it would be:
// class Blockchain {
//    constructor() {
//       this.chain = [];
//       this.newTransaction = [];
//    }

//    // We'd place all the methods in here
// }

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
   const newBlock = { // This is gonna be a block inside our blockchain
      index: this.chain.length + 1, // Block number
      timestamp: Date.now(),
      transactions: this.pendingTransactions, // All the tnx waiting to be included in a new block
      nonce: nonce, // It's proof (PoW) (a number) that we created this block in a legitimate way
      hash: hash, // We get this passing our pendingTransactions into a hashing function
      previousBlockHash: previousBlockHash
   };

   this.pendingTransactions = []; // We empy out the pending transactions after we include them in the new block
   this.chain.push(newBlock);

   return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
   return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
   const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
      transactionId: uuid().split('-').join('')
   };

   return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
   this.pendingTransactions.push(transactionObj);

   return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
   const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData); // This way we'll have all the parameters concadenated in a single string
   const hash = sha256(dataAsString);
   return hash;
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
   // => repeatedly hash block until it finds correct hash => '0000HASDF9ASGDHASD88Y6' starting with four '0'
   // => uses current block data for the hash, but also the previousBlockHash
   // => constinuously changes nonce value until it finds the correct hash
   // => returns to us the nonce value that creates the correct hash
   let nonce = 0;
   let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

   while (hash.substring(0, 4) !== '0000') {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
   }

   return nonce;
}

Blockchain.prototype.chainIsValid = function (blockchain) {
   let validChain = true;

   for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain[i];
      const prevBlock = blockchain[i -1];
      const blockHash = this.hashBlock(
         prevBlock['hash'],
         { 
            transactions: currentBlock['transactions'],
            index: currentBlock['index']
         },
         currentBlock['nonce']
      );

      // we hash every block and make sure that the hash starts with '0000'
      if (blockHash.substring(0,4) !== '0000') {
         validChain = false;
      }
      
      // check all the hashes align properly
      if (currentBlock['previousBlockHash'] !== prevBlock['hash']) {
         validChain = false;
      }

      // console.log('previousBlockHash =>', prevBlock['hash']);
      // console.log('currentBlockHash =>', currentBlock['hash']);
   }

   // check the genesis block has the correct data we hardcoded
   const genesisBlock = blockchain[0];
   const correctNonce = genesisBlock['nonce'] === 100;
   const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
   const correctHash = genesisBlock['hash'] === '0';
   const correctTransactions = genesisBlock['transactions'].length === 0;

   if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) {
      validChain = false;
   }

   return validChain;
}


module.exports = Blockchain;