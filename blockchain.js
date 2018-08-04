

let sha256 = require('js-sha256')
let Block = require('./block')

class Blockchain {

  constructor(genesisBlock) {

    this.blocks = []
    this.addBlock(genesisBlock)
  }

    /**
     * 添加一个新的Block到区块链中
     * @param block
     */
  addBlock(block) {

    if(this.blocks.length == 0) {
      block.previousHash = "0000000000000000"
      block.hash = this.generateHash(block)
    }

    this.blocks.push(block)

  }

    /**
     * 根据现有交易记录，生成一个新的block
     * @param transactions
     * @returns {Block}
     */
  getNextBlock(transactions) {

      let block = new Block()

      transactions.forEach(function(transaction){
        block.addTransaction(transaction)
      })

      let previousBlock = this.getPreviousBlock()
      block.index = this.blocks.length
      block.previousHash = previousBlock.hash
      block.hash = this.generateHash(block)

      return block
  }

  transactionsByDrivingLicenseNumber(drivingLicenseNumber) {
      let transactions = []

      this.blocks.forEach( block => {

          block.transactions.forEach(transaction => {
              if(transaction.driverLicenseNumber == drivingLicenseNumber){
                  transactions.push(transaction);
              }
          })
      })

      return transactions;
  }

  getPreviousBlock() {
    return this.blocks[this.blocks.length - 1]
  }

  generateHash(block) {

      let hash = sha256(block.key)

      while(!hash.startsWith("000")) {
        block.nonce += 1
        hash = sha256(block.key)
        console.log(hash)
      }

      return hash
  }

}

module.exports = Blockchain
