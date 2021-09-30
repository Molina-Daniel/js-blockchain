function Blockchain() {
   this.chain = []; // Stores all the blocks that we create and mine
   this.newTransaction = []; // Stores all the new transactions created before they're placed into a block and mined
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
      transactions: this.newTransaction, // All the tnx waiting to be included in a new block
      nonce: nonce, // It's proof (PoW) (a number) that we created this block in a legitimate way
      hash: hash, // We get this passing our newTransactions into a hashing function
      previousBlockHash: previousBlockHash
   }

   this.newTransaction = []; // we empy out the pending transactions after we include them in the new block
   this.chain.push(newBlock);

   return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
   return this.chain[this.chain.length - 1];
}


module.exports = Blockchain;