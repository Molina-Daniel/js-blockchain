const express = require('express')
const app = express()
 
// Send back the entire blockchain
app.get('/blockchain', function (req, res) {
  
});

// End-point to create a transaction in the blockchain
app.post('/transaction', function (req, res) {
   
});

// End-point to mine/create a new block
app.get('/mine', function (req, res) {
  
});
 
app.listen(3000, function () {
   console.log('Listening on port 3000... http://localhost:3000/');
});