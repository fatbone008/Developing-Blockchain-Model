let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.json())

let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

let transactions = []
let genisisBlock = new Block()
let blockchain = new Blockchain(genisisBlock)

app.get('/', function (req, res,next) {
    res.send('hello world');
})

app.get('/mine', function (req, res) {
    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    res.json(block)
})
app.post('/transaction', function (req, res) {
    let to = req.body.to
    let from = req.body.from
    let amount = req.body.amount

    let transaction = new Transaction(from, to, amount)

    transactions.push(transaction)

    console.log('res.body.to:', req.body.to)
    console.log('res.body.from:', req.body.from)
    console.log('res.body.amount:', req.body.amount)

    res.json(transactions)
})

app.get('/blockchain', function (req, res, next) {
    // let transaction = new Transaction('Mary','Jerry',100)
    //
    // let genesisBlock = new Block()
    // let blockchain = new Blockchain(genesisBlock)
    //
    // let block = blockchain.getNextBlock([transaction])
    // blockchain.addBlock(block)
    //
    // let anotherTransaction = new Transaction("Azam","Jerry",10)
    // let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
    // blockchain.addBlock(block1)
    //
    res.json(blockchain)
})
app.listen(3000, function () {
    console.log("prot start at localhost:3000")
})
//
//
// console.log(blockchain)
