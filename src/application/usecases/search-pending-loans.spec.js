const { AppError } = require("../errors");
const SearchPendingLoansUseCase = require("./search-pending-loans");

describe("SearchPendingLoans", () => {

    const loanRepository = {
        findPendingLoansWithUserAndbook: jest.fn()
    }

    it("Should be able to retrieve a list of pending loans", async () => {

        loanRepository.findPendingLoansWithUserAndbook.mockResolvedValue([
            {
                user: {
                    name: "any_name",
                    cpf: "any_cpf"
                },
                book: {
                    name: "any_book_name"
                },
                loanDate: "2025-01-01",
                returnBookDate: "2025-02-01",
            },
            {
                user: {
                    name: "any_valid_name",
                    cpf: "any_valid_cpf"
                },
                book: {
                    name: "anyvalid__book_name"
                },
                loanDate: "2025-01-10",
                returnBookDate: "2025-02-20",
            },
        ]);

        const sut = SearchPendingLoansUseCase({ loanRepository });
        const output = await sut();

        expect(output.right).toHaveLength(2);
        expect(output.right[0]).toEqual({
            user: {
                name: "any_name",
                cpf: "any_cpf"
            },
            book: {
                name: "any_book_name"
            },
            loanDate: "2025-01-01",
            returnBookDate: "2025-02-01",
        })
    });

    it("should return an AppError if no dependecy is provided", () => {
        expect(() => SearchPendingLoansUseCase({ })).toThrow(new AppError(AppError.dependencies))
    });

})