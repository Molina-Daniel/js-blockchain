const express = require('express')
const app = express()
const Blockchain = require('./blockchain');

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
  
});
 
app.listen(3000, function () {
   console.log('Listening on port 3000... http://localhost:3000/');
});
