describe("ReturnBookUsecase", () => {

    const loanRepository = {
        return: jest.fn()
    }

    it("Should be able to return a book without a fine", async () => {

        const returnBookDTO = {
            loanmentId: "ANY_ID",
            returnDate: new Date("2024-08-11"),
        }

        const sut = returnBookUsecase({ loanRepository });
        const output = await sut(returnBookDTO);

        expect(output.right).toBe("Fine not applied");
        expect(loanRepository.return).toHaveBeenCalledTimes(1);
        expect(loanRepository.return).toHaveBeenCalledWith(returnBookDTO);
    })
})