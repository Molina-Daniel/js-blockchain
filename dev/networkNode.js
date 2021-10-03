const express = require('express')
const app = express()
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];
const axios = require('axios').default;

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
   const newNodeUrl = req.body.newNodeUrl;
   if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
      bitcoin.networkNodes.push(newNodeUrl);
   };

   const regNodesPromises = [];
   bitcoin.networkNodes.forEach(networkNodeUrl => {
      // register the newNodeUrl by hitting '/register-node' endpoint
      console.log(networkNodeUrl);
      regNodesPromises.push(
         axios({
            method: 'post',
            url: networkNodeUrl + '/register-node',
            data: {
              newNodeUrl: newNodeUrl
            }
          })
      );
   });

   Promise.all(regNodesPromises)
   .then(data => {
      // console.log("1", data);
      return axios({
         method: 'post',
         url: newNodeUrl + '/register-nodes-bulk',
         data: {
           allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ]
         }
      })
   })
   .then(data => {
      // console.log("2", data);
      res.json({ note: 'New node registered with network successfully.'});
   });

});

// Register a node with the network
app.post('/register-node', function (req, res) {
   const newNodeUrl = req.body.newNodeUrl;
   const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
   const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

   if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(newNodeUrl);
      res.json({ note: 'New node registered successfully' });
   } else {
      res.json({ note: 'The node is already registered'});
   };
});

// Register multiple nodes at once
app.post('/register-nodes-bulk', function (req, res) {
   const allNetworkNodes = req.body.allNetworkNodes;

   allNetworkNodes.forEach(networkNodeUrl => {
      const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
      const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
      //---------------------------------------
      // console.log(notCurrentNode); // for debugging
      // console.log(bitcoin.currentNodeUrl, networkNodeUrl);
      //-------------------------------------

      if (nodeNotAlreadyPresent && notCurrentNode) {
         bitcoin.networkNodes.push(networkNodeUrl);
      }
   });
   
   res.json({ note: 'Bulk registration successfully' });
});
 
app.listen(port, function () {
   console.log(`Listening on port ${ port }... http://localhost:${ port }/`);
});
