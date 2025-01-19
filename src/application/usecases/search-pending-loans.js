const { AppError, Either } = require("../errors")

module.exports = function searchPendingLoans({ loanRepository }) {
    
    if(!loanRepository) throw new AppError(AppError.dependencies);

    return async () => {
        let loans = await loanRepository.findPendingLoansWithUserAndbook();
        return Either.Right(loans);
    }
}