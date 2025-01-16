const loanmentEntity = require("../enterprise/entities/loanment.entity");
const { Either, AppError } = require("../errors")

module.exports = function returnBookUseCase ({ loanRepository }) {

    if(!loanRepository) throw new AppError(AppError.dependencies);

    return async ({ loanmentId, returnDate }) => {
        
        const isValidData = loanmentId && returnDate
        if(!isValidData) throw new AppError(AppError.missingParams);

        const { returnBookDate } = await loanRepository.return({ loanmentId, returnDate });
        
        const applyFine = loanmentEntity.calculateFine({ returnDate, returnBookDate });
        return Either.Right(applyFine);
    }

}