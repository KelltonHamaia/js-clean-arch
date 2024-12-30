const { AppError, Either } = require("../errors");

module.exports = function searchUserByCPFUseCase({ userRepository }) {

    return async ({ cpf }) => {
        const user = await userRepository.findByCpf(cpf);
        return Either.Right(user)
    }
}