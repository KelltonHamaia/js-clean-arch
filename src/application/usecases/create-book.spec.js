const { AppError } = require("../errors");
const createBookUseCase = require("./create-book");

describe("Create book Use Case", () => { 

    const bookRepository = {
        save: jest.fn()
    }

    it("Should create a book", async () => {
        const bookDTO = {
            name: "valid name",
            quantity: "valid quantity",
            author: "valid author",
            genre: "valid genre",
            isbn: "valid isbn",
        }

        const sut = createBookUseCase({ bookRepository })
        const output = await sut(bookDTO);

        expect(output.right).toBeNull();
        expect(bookRepository.save).toHaveBeenCalledTimes(1);
        expect(bookRepository.save).toHaveBeenCalledWith(bookDTO);

    })

    it("Should throw an AppError if bookRepository is not provided", () => {
        expect(() => createBookUseCase({ })).toThrow(new AppError(AppError.dependencies))      
    })
})