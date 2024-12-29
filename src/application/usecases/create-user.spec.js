const { Either } = require("../errors");
const AppError = require("../errors/AppError");
const createUserUseCase = require("./create-user")

describe("Create user Use Case", () => {

    const userRepository = {
        save: jest.fn(),
        findByCpf: jest.fn()
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

        expect(output.right).toBeNull();
        expect(userRepository.save).toHaveBeenCalledWith(userDTO);
        expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it("Should return an error if no userRepository is provided", () => {
        expect(() => createUserUseCase({ })).toThrow(new AppError(AppError.dependencies));
    });

    it("Should return an error if tehere are missing params", async () => {
        const sut = createUserUseCase({ userRepository });
        await expect(() => sut({})).rejects.toThrow( new AppError(AppError.missingParams));
    });

    it("Should return an error if the provided CPF is already being used", async () => {

        userRepository.findByCpf.mockResolvedValueOnce(true);
        
        const userDTO = {
            fullname: "kellton",
            cpf:  "cpf_taken",
            phoneNumber:  12345678,
            address: "St Louis", 
            email: "kell@gmail.com"  
        }

        const sut = createUserUseCase({ userRepository });
        const output = await sut(userDTO);

        expect(output.right).toBeNull();
        expect(output.left).toEqual(Either.FieldAlreadyTaken("cpf"));
        expect(userRepository.findByCpf).toHaveBeenCalledWith(userDTO.cpf);
        expect(userRepository.findByCpf).toHaveBeenCalledTimes(1);
    })


})