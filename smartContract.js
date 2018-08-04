class DrivingRecordSmartContract {

    apply(transaction, blocks) {
        blocks.forEach(block => {
            block.transactions.forEach( tran => {
                if(transaction.driverLicenseNumber === tran.driverLicenseNumber) {
                    transaction.noOfViolations += 1;
                    if(transaction.noOfViolations >= 5) {
                        transaction.isDriverLicenseSuspended = true;
                    }
                }
            })
        })
    }

}

module.exports = DrivingRecordSmartContract