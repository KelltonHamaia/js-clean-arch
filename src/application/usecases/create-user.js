module.exports = function CreateUserUseCase({ userRepository }) {
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