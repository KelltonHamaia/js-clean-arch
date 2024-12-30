const searchUserByCPFUseCase = require("./search-user-by-cpf")

describe("Search user by CPF Use Case", () => {

    const userRepository = {
        findByCpf: jest.fn()
    }

    it("Should return the user if the provided CPF is registered", async () => {
        const cpfDTO = {
            cpf: "CPF_registered"
        }

        const outputDTO = {
            id: "any_ID",
            fullname: "any_name",
            cpf: "CPF_registered",
            phoneNumber: "any_phone",
            address: "any_address",
            email: "any_email"  
        }

        userRepository.findByCpf.mockResolvedValueOnce(outputDTO);  

        const sut = searchUserByCPFUseCase({ userRepository });
        const output = await sut(cpfDTO);

        expect(output.right).toEqual(outputDTO);
        expect(userRepository.findByCpf).toHaveBeenCalledWith(cpfDTO.cpf);
        expect(userRepository.findByCpf).toHaveBeenCalledTimes(1);
    });

    it("Should return null if the provided CPF doesn't exists", async () => {
        const cpfDTO = {
            cpf: "CPF_not_registered"
        }

        userRepository.findByCpf.mockResolvedValueOnce(null);

        const sut = searchUserByCPFUseCase({ userRepository });
        const output = await sut(cpfDTO);

        expect(output.right).toBeNull();
        expect(userRepository.findByCpf).toHaveBeenCalledTimes(1);
        expect(userRepository.findByCpf).toHaveBeenCalledWith(cpfDTO.cpf);

    });

})