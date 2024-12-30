const { Either, AppError } = require("../errors");
const borrowABookUseCase = require("./borrow-a-book")


describe("Borrow a book Use Case", () => {
    
    const loanRepository = {
        save: jest.fn(),
        findBooksUnderLoanFromUser: jest.fn()
    }

    it("Should create a new borrow", async () => {

        loanRepository.findBooksUnderLoanFromUser.mockResolvedValue(false);

        const borrowDTO = {
            userId: "valid_id",
            bookId: "valid_id",
            departureDate: new Date("2024-12-10"),
            returnDate: new Date("2025-01-10")
        }

        const sut = borrowABookUseCase({ loanRepository });
        const output = await sut(borrowDTO);

        expect(output.right).toBeNull();
        expect(loanRepository.save).toHaveBeenCalledTimes(1);
        expect(loanRepository.save).toHaveBeenCalledWith(borrowDTO);
        expect(loanRepository.findBooksUnderLoanFromUser).toHaveBeenCalledTimes(1);
        expect(loanRepository.findBooksUnderLoanFromUser).toHaveBeenCalledWith({ userId: borrowDTO.userId, bookId: borrowDTO.bookId });

    });

    it("Should return an Either.left if the departure date greater than return date", async () => {
        const borrowDTO = {
            userId: "valid_id",
            bookId: "valid_id",
            departureDate: new Date("2025-01-10"),
            returnDate: new Date("2024-12-10")
        }

        const sut = borrowABookUseCase({ loanRepository });
        const output = await sut(borrowDTO);

        expect(output.left).toBe(Either.DepartureDateLowerThanReturnDate);
    });

    it("Should return an Either.left if the user has a book with ISBN under loan", async () => {

        loanRepository.findBooksUnderLoanFromUser.mockResolvedValue(true);

        const borrowDTO = {
            userId: "valid_id",
            bookId: "valid_id",
            departureDate: new Date("2024-01-10"),
            returnDate: new Date("2025-01-10")
        }

        const sut = borrowABookUseCase({ loanRepository });
        const output = await sut(borrowDTO);

        expect(output.left).toBe(Either.UserWithSameBookUnderPendingLoan);
        expect(loanRepository.findBooksUnderLoanFromUser).toHaveBeenCalledTimes(1);
        expect(loanRepository.findBooksUnderLoanFromUser).toHaveBeenCalledWith({ userId: borrowDTO.userId, bookId: borrowDTO.bookId });
    });

    it("Should throw an AppError id the loanRepository is not provided", () => {
        expect(() => borrowABookUseCase({})).toThrow(AppError.dependencies);
    });

    it("Should throw an AppError if some parameter is missing", async () => {
        const sut = borrowABookUseCase({ loanRepository });
        await expect(() => sut({ })).rejects.toThrow(AppError.missingParams);
    });
})