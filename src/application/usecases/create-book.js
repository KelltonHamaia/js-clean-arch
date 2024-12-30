const { Either, AppError } = require("../errors");

module.exports = function createBookUseCase( { bookRepository }) {

    if (!bookRepository) throw new AppError(AppError.dependencies);

    return async ({ name, quantity, author, genre, isbn }) => {

        const allParamsCorrectlyProvided = name && quantity && author && genre && isbn;
        if(!allParamsCorrectlyProvided) throw new AppError(AppError.missingParams);

        await bookRepository.save({ 
            name, 
            quantity, 
            author, 
            genre, 
            isbn 
        });

        return Either.Right(null);
    }

}