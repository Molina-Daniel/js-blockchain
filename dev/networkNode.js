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

// Create a new transaction and broadcast it to the whole network
app.post('/transaction/broadcast', function (req, res) {
   // create a new transaction and add it to the pendingTransactions array of the current node
   const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   bitcoin.addTransactionToPendingTransactions(newTransaction);

   // broadcast the new transaction we just created to the other network nodes
   const requestPromises = [];
   bitcoin.networkNodes.forEach(networkNodeUrl => {

      requestPromises.push(
         axios({
            method: 'post',
            url: networkNodeUrl + '/transaction',
            data: {
               newTransaction
            }
         })
      );
   });

   Promise.all(requestPromises)
   .then(data => {
      // console.log('Transaction', data);
      res.json({ note: 'Transaction created and broadcasted successfully.'});
   });
});

// Include the new transaction in the node
app.post('/transaction', function (req, res) {
   const newTransaction = req.body.newTransaction;
   const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
   res.json({ note: `Transaction will be added in block ${ blockIndex }.`});
});

// End-point to mine/create a new block
app.get('/mine', function (req, res) {
   // first we create/mine a new block
   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];
   const currentBlockData = {
      transactions: bitcoin.pendingTransactions,
      index: lastBlock['index'] + 1
   };
   const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
   const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
   const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

   // then we broadcast the new block to the other network nodes
   const requestPromises = [];
   bitcoin.networkNodes.forEach(networkNodeUrl => {
      requestPromises.push(
         axios({
            method: 'post',
            url: networkNodeUrl + '/receive-new-block',
            data: {
               newBlock: newBlock
            }
          })
      );
   });

   Promise.all(requestPromises)
   .then(data => {
      // we also create and broadcast the miner reward transaction
      return axios({
         method: 'post',
         url: bitcoin.currentNodeUrl + '/transaction/broadcast',
         data: {
            amount: 12.5,
            sender: "00",
            receiver: nodeAddress
         }
       })
   })
   .then(
      res.json({
         note: "New block mined and broadcast successfully",
         block: newBlock
      })
   );
});

// Includes the new block mined in a specific network node after evaluates its legitimacy
app.post('/receive-new-block', function (req, res) {
   const newBlock = req.body.newBlock;

   // check the previous block hash
   const lastBlock = bitcoin.getLastBlock();
   const correctHash = lastBlock.hash === newBlock.previousBlockHash;

   // check the correct index of the new block
   const correctIndex = lastBlock.index + 1 === newBlock.index;

   if (correctHash && correctIndex) {
      bitcoin.chain.push(newBlock);
      bitcoin.pendingTransactions = [];
      res.json({ 
         note: 'New block received and accepted',
         newBlock: newBlock
      })
   } else {
      res.json({
         note: 'New block rejected',
         newBlock: newBlock
      })
   }
})

// Resgister a new node and broadcast it to the whole network
app.post('/register-and-broadcast-node', function (req, res) {
   const newNodeUrl = req.body.newNodeUrl;
   if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
      bitcoin.networkNodes.push(newNodeUrl);
   };

   const regNodesPromises = [];
   bitcoin.networkNodes.forEach(networkNodeUrl => {
      // register the newNodeUrl by hitting '/register-node' endpoint
      // console.log(networkNodeUrl);
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
