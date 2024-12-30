const { Either } = require("../errors");

module.exports = function searchBookByIsbnOrNameUseCase({ bookRepository }) {
    return async ({ value }) => {
        const books = await bookRepository.findByIsbnOrName(value);
        return Either.Right(books);
    }
}