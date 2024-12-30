const { AppError, Either } = require("../errors");
const createBookUseCase = require("./create-book");

describe("Create book Use Case", () => { 

    const bookRepository = {
        save: jest.fn(),
        findByIsbn: jest.fn()
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
    });

    it("Should throw an AppError if it's missing required params", async () => {
        const sut = createBookUseCase({ bookRepository });
        await expect(() => sut({ })).rejects.toThrow(new AppError(AppError.missingParams));
    });

    it("Should return Either.left if the ISBN's already in use", async () => {

        bookRepository.findByIsbn.mockResolvedValueOnce(true);

        const bookDTO = {
            name: "valid name",
            quantity: "valid quantity",
            author: "valid author",
            genre: "valid genre",
            isbn: "INVALID_ISBN",
        }

        const suv = createBookUseCase({ bookRepository });
        const output = await suv(bookDTO);
        expect(output.left).toEqual(Either.FieldAlreadyTaken("isbn"));
        expect(bookRepository.findByIsbn).toHaveBeenCalledTimes(1);
        expect(bookRepository.findByIsbn).toHaveBeenCalledWith(bookDTO.isbn)
    })

})