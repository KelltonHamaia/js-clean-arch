const { AppError, Either } = require("../errors");

module.exports = function SearchByCPFUseCase({ userRepository }) {

    return async ({ cpf }) => {
    
        if( !cpf ) throw new AppError(AppError.missingParams);
    
        const user = await userRepository.findByCpf(cpf);
        return Either.Right(user)
    }
}