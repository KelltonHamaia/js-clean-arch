const { AppError, Either } = require("../errors");

module.exports = function searchUserByCPFUseCase({ userRepository }) {

    if(!userRepository) throw new AppError(AppError.dependencies);

    return async ({ cpf }) => {
        const user = await userRepository.findByCpf(cpf);
        return Either.Right(user)
    }
}