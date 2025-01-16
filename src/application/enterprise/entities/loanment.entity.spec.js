const loanmentEntity = require("./loanment.entity")

describe("LoanmentEntity", () => {
    it("Should calculate a fine without late taxes", () => {

        const loanmentDTO = {
            returnBookDate: "2025-02-10", 
            returnDate: "2025-02-10"
        }

        const sut = loanmentEntity.calculateFine(loanmentDTO);
        expect(sut).toBe("Fine not applied");
    })
})