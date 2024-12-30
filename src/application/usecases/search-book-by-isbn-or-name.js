const { Either, AppError } = require("../errors");

module.exports = function searchBookByIsbnOrNameUseCase({ bookRepository }) {

    if(!bookRepository) throw new AppError(AppError.dependencies);

    return async ({ value }) => {
        const books = await bookRepository.findByIsbnOrName(value);
        return Either.Right(books);
    }
}