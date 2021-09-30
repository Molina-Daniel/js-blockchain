const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2435, '1U3G8T41038', '93FSEJGF983');
bitcoin.createNewBlock(111, '93FSEJGF983', 'JNAWESFBDRG89');
bitcoin.createNewBlock(2753, 'JNAWESFBDRG89', 'A8WSAHSVDFH897');

console.log(bitcoin);
