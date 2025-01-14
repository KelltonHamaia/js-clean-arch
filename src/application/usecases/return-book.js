const { Either, AppError } = require("../errors")

module.exports = function returnBookUseCase ({ loanRepository }) {

    if(!loanRepository) throw new AppError(AppError.dependencies);

    return async ({ loanmentId, returnDate }) => {
        const { returnBookDate } = await loanRepository.return({ loanmentId, returnDate });
        
        const applyFine = new Date(returnBookDate).getTime() < new Date(returnDate).getTime();
        const verifyFine = applyFine ? "Fine Applied: $10.00" : "Fine not applied";
        return Either.Right(verifyFine);
    }

}