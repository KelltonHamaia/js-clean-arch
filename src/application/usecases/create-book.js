const { Either } = require("../errors");

module.exports = function createBookUseCase( { bookRepository }) {
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