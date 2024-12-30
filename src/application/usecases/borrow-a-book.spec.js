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

    })

})