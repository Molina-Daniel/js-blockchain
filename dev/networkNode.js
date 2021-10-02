const express = require('express')
const app = express()
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];

const nodeAddress = uuid().split('-').join(''); // Removes the dashes (---) from the uuid

const bitcoin = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({   extended: true }));
 
// Send back the entire blockchain
app.get('/blockchain', function (req, res) {
   res.send(bitcoin);
});

// End-point to create a transaction in the blockchain
app.post('/transaction', function (req, res) {
   const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: `Trasaction will be added in block ${blockIndex}.` });
});

// End-point to mine/create a new block
app.get('/mine', function (req, res) {
   // res.send(bitcoin.getLastBlock().hash);
   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];
   const currentBlockData = {
      transactions: bitcoin.pendingTransactions,
      index: lastBlock['index'] + 1
   };
   const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
   const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

   bitcoin.createNewTransaction(12.5, "00", nodeAddress);

   const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

   res.json({
      note: "New block mined successfully",
      block: newBlock
   })
});

// Resgister a new node and broadcast it to the whole network
app.post('/register-and-broadcast-node', function (req, res) {
   const newNodeUrl = req.body.newNodeUrl
})

// Register a node with the network
app.post('/register-node', function (req, res) {
   
})

// Register multiple nodes at once
app.post('/register-node-bulk', function (req, res) {
   
})
 
app.listen(port, function () {
   console.log(`Listening on port ${ port }... http://localhost:${ port }/`);
});
