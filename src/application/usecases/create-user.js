module.exports = function CreateUserUseCase({ userRepository }) {

    if(!userRepository) throw new Error("UserRepository not provided.");    

    return async ({ fullname, cpf, phoneNumber, address, email}) => {
        await userRepository.save({ 
            fullname, 
            cpf, 
            phoneNumber, 
            address, 
            email 
        });
    }
}