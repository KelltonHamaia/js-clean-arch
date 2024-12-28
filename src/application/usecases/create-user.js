module.exports = {
    async createUser({ fullname, cpf, phoneNumber, address, email}) {
        await userRepository.save({ 
            fullname, 
            cpf, 
            phoneNumber, 
            address, 
            email 
        });
    }
}