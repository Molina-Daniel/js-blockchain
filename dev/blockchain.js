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
