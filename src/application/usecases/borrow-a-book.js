const { AppError, Either } = require("../errors")

module.exports = function borrowABookUseCase ({ loanRepository, emailService }) {

    if(!loanRepository || !emailService) throw new AppError(AppError.dependencies)

    return async ({ userId, bookId, departureDate, returnDate }) => {
        
        const allParamsProvidedCorrectly = userId && bookId && departureDate && returnDate;
        if(!allParamsProvidedCorrectly) throw new AppError(AppError.missingParams)
        
        if(departureDate.getTime() > returnDate.getTime()) return Either.Left(Either.DepartureDateLowerThanReturnDate)

        const userHasBookWithUnderLoanWithSameIsbn = await loanRepository.findBooksUnderLoanFromUser({ userId, bookId });
        if(userHasBookWithUnderLoanWithSameIsbn) return Either.Left(Either.UserWithSameBookUnderPendingLoan);

        const id = await loanRepository.save({
            userId:userId,
            bookId: bookId,
            departureDate: departureDate,
            returnDate: returnDate
        });

        const { user, book } = await loanRepository.findLoanById(id);

        await emailService.sendEmail({
            departureDate: departureDate,
            returnDate: returnDate,
            user: user.fullname,
            email: user.email,
            cpf: user.cpf,
            book: book.name
        });

        return Either.Right(null);
    
    }
}