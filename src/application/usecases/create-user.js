const AppError = require("../errors/AppError");

module.exports = function CreateUserUseCase({ userRepository }) {

    if(!userRepository) throw new AppError(AppError.dependencies);    

    return async ({ fullname, cpf, phoneNumber, address, email }) => {

        const isMissingParams =  fullname && cpf && phoneNumber && address && email;
        if(!isMissingParams) throw new AppError(AppError.missingParams);

        await userRepository.save({ 
            fullname, 
            cpf, 
            phoneNumber, 
            address, 
            email 
        });
    }
}