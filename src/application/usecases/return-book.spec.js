const { AppError } = require("../errors");
const returnBookUseCase = require("./return-book")

describe("ReturnBookUsecase", () => {

    const loanRepository = {
        return: jest.fn()
    }
    
    it("Should be able to return a book without a fine", async () => {

        loanRepository.return.mockResolvedValueOnce({
            returnBookDate: new Date("2024-09-01"),
        });

        const returnBookDTO = {
            loanmentId: "ANY_ID",
            returnDate: new Date("2024-08-11"),
        }

        const sut = returnBookUseCase({ loanRepository });
        const output = await sut(returnBookDTO);

        expect(output.right).toBe("Fine not applied");
        expect(loanRepository.return).toHaveBeenCalledTimes(1);
        expect(loanRepository.return).toHaveBeenCalledWith(returnBookDTO);
    });

    it("Should return a book applying a fine to it", async () => {
        
        loanRepository.return.mockResolvedValueOnce({
            returnBookDate: new Date("2024-08-01"),
        });

        const returnBookDTO = {
            loanmentId: "ANY_ID",
            returnDate: new Date("2024-08-11"),
        }

        const sut = returnBookUseCase({ loanRepository });
        const output = await sut(returnBookDTO);

        expect(output.right).toBe("Fine Applied: $10.00");
        expect(loanRepository.return).toHaveBeenCalledTimes(1);
        expect(loanRepository.return).toHaveBeenCalledWith(returnBookDTO);
    });

    it("Should return an AppError if no repository is provided", async () => {
        expect(() => returnBookUseCase({ })).toThrow(new AppError(AppError.dependencies));
    });

    it("Should return an AppError if there's missing params", async () => {
        const sut = returnBookUseCase({ loanRepository });
        await expect(()=> sut({ })).rejects.toThrow(new AppError(AppError.missingParams));
    })
})