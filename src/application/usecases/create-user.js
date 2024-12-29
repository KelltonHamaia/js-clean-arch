const { Either } = require("../errors");
const AppError = require("../errors/AppError");

module.exports = function CreateUserUseCase({ userRepository }) {

    if(!userRepository) throw new AppError(AppError.dependencies);    

    return async ({ fullname, cpf, phoneNumber, address, email }) => {

        const isMissingParams =  fullname && cpf && phoneNumber && address && email;
        if(!isMissingParams) throw new AppError(AppError.missingParams);

        const checkIfCpfIsTakenByAnUser = await userRepository.findByCpf(cpf);
        if(checkIfCpfIsTakenByAnUser) return Either.Left(Either.FieldAlreadyTaken("cpf"));

        await userRepository.save({ 
            fullname, 
            cpf, 
            phoneNumber, 
            address, 
            email 
        });

        return Either.Right(null);
    }
}