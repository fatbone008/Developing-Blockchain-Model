let Block = require('./Block')
let Blockchain = require('./Blockchain')

let genesisBlock = new Block();
let blockchain = new Blockchain(genesisBlock);

console.log()