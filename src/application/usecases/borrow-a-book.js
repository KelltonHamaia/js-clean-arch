const { AppError, Either } = require("../errors")

module.exports = function borrowABookUseCase ({ loanRepository }) {

    if(!loanRepository) throw new AppError(AppError.dependencies)

    return async ({ userId, bookId, departureDate, returnDate }) => {
        
        const allParamsProvidedCorrectly = userId && bookId && departureDate && returnDate;
        if(!allParamsProvidedCorrectly) throw new AppError(AppError.missingParams)
        
        if(departureDate.getTime() > returnDate.getTime()) return Either.Left(Either.DepartureDateLowerThanReturnDate)

        const userHasBookWithUnderLoanWithSameIsbn = await loanRepository.findBooksUnderLoanFromUser({ userId, bookId });
        if(userHasBookWithUnderLoanWithSameIsbn) return Either.Left(Either.UserWithSameBookUnderPendingLoan);

        await loanRepository.save({
            userId,
            bookId,
            departureDate,
            returnDate
        });

        return Either.Right(null);
    
    }
}