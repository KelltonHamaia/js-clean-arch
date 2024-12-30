const { AppError, Either } = require("../errors");

module.exports = function searchUserByCPFUseCase({ userRepository }) {

    if(!userRepository) throw new AppError(AppError.dependencies);

    return async ({ cpf }) => {

        if(!cpf) throw new AppError(AppError.missingParams);    

        const user = await userRepository.findByCpf(cpf);
        return Either.Right(user)
    }
}