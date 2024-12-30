const { Either, AppError } = require("../errors");

module.exports = function searchBookByIsbnOrNameUseCase({ bookRepository }) {

    if(!bookRepository) throw new AppError(AppError.dependencies);

    return async ({ value }) => {

        if(!value) throw new AppError(AppError.missingParams);

        const books = await bookRepository.findByIsbnOrName(value);
        return Either.Right(books);
    }
}