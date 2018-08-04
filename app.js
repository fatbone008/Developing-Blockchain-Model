let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let fetch = require('node-fetch')
let sha256 = require('js-sha256')
let DrivingRecordSmartContract = require('./smartContract')

app.use(bodyParser.json())

let port = 3000

process.argv.forEach((val, index, array) => {
    port = array[2]
})

if(port == undefined){
    port = 3000
}

let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')
let BlockchainNode = require('./BlockchainNode')

let transactions = []
let nodes = []
let genisisBlock = new Block()
let blockchain = new Blockchain(genisisBlock)

app.get('/', function (req, res,next) {
    res.send('hello world');
})

app.get('/resolve', function (req, res, next) {

    nodes.forEach(node => {
        fetch(node.url + '/blockchain')
            .then(response => {
                return response.json()
            })
            .then(otherBlockchain => {
                // console.log(blockchain)
                if(blockchain.blocks.length < otherBlockchain.blocks.length){
                    blockchain = otherBlockchain
                }
            })
    })
})

app.post('/nodes/register', function (req, res) {
    let nodesLists = req.body.urls;
    
    nodesLists.forEach(function (nodeDictionary) {
        let node = new BlockchainNode(nodeDictionary['url'])
        nodes.push(node)
    })

    res.json(nodes)
})

app.get('/nodes', function (req, res) {
    res.json(nodes)
})

app.get('/mine', function (req, res) {
    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    transactions = []
    res.json(block)
})

app.post('/transaction', function (req, res) {
    // let to = req.body.to
    // let from = req.body.from
    // let amount = req.body.amount

    let driverLicenseNumber = sha256(req.body.driverLicenseNumber);
    let violationDate = req.body.violationDate;
    let violationType = req.body.violationType;


    let transaction = new Transaction(driverLicenseNumber, violationDate, violationType)

    let drivingRecordSmartContract = new DrivingRecordSmartContract()
    drivingRecordSmartContract.apply(transaction, blockchain.blocks)

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
app.listen(port, function () {
    console.log("prot start at localhost:", port)
})
//
//
// console.log(blockchain)
