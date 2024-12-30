const { Either, AppError } = require("../errors");

module.exports = function createBookUseCase( { bookRepository }) {

    if (!bookRepository) throw new AppError(AppError.dependencies);

    return async ({ name, quantity, author, genre, isbn }) => {
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