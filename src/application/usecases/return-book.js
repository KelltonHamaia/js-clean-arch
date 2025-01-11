const { Either } = require("../errors")

module.exports = function returnBookUseCase ({ loanRepository }) {
    
    return async ({ loanmentId, returnDate }) => {
        await loanRepository.return({ loanmentId, returnDate });
        
        const verifyFine = "Fine not applied";
        return Either.Right(verifyFine);
    }

}