const createUserUseCase = require("./create-user")

describe("Create user Use Case", () => {

    const userRepository = {
        save: jest.fn()
    }

    it("Should be able to register an user", async () => {
        const userDTO = {
            fullname: "kellton",
            cpf:  "12312312345",
            phoneNumber:  12345678,
            address: "St Louis", 
            email: "kell@gmail.com"  
        }

        const sut = createUserUseCase({ userRepository });
        const output = await sut(userDTO)

        expect(output).toBeUndefined();
        expect(userRepository.save).toHaveBeenCalledWith(userDTO);
        expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
})