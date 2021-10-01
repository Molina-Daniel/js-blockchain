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
   console.log(req.body);
   res.send(`The amount of the transaction is ${req.body.amount} bitcoins.`);
});

// End-point to mine/create a new block
app.get('/mine', function (req, res) {
  
});
 
app.listen(3000, function () {
   console.log('Listening on port 3000... http://localhost:3000/');
});
