const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2435, '1U3G8T41038', '93FSEJGF983');

bitcoin.createNewTransaction(100, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

bitcoin.createNewBlock(1113, '93FSEJGF983', 'JNAWESFBDRG');

bitcoin.createNewTransaction(50, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
bitcoin.createNewTransaction(300, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');
bitcoin.createNewTransaction(200, 'ALEXJE74U2HFV832B48V', 'JENNF76QWG9E7F6QWG');

bitcoin.createNewBlock(2753, 'JNAWESFBDRG', 'A8WSAHSVDFH');

console.log(bitcoin);
console.log(bitcoin.chain[2]);
