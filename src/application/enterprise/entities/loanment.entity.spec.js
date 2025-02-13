const { AppError } = require("../../errors");
const loanmentEntity = require("./loanment.entity")

describe("LoanmentEntity", () => {
    it("Should calculate a fine without late taxes", () => {

        const loanmentDTO = {
            returnBookDate: "2025-02-10", 
            returnDate: "2025-02-10"
        }

        const sut = loanmentEntity.calculateFine(loanmentDTO);
        expect(sut).toBe("Fine not applied");
    });

    it("Should calculate a fine without late taxes", () => {

        const loanmentDTO = {
            returnBookDate: "2025-02-10", 
            returnDate: "2025-02-20"
        }

        const sut = loanmentEntity.calculateFine(loanmentDTO);
        expect(sut).toBe("Fine Applied: $10.00");
    })
    
    it("Should throw an error if no required params are provided", () => {
        expect(() => loanmentEntity.calculateFine({})).toThrow(new AppError(AppError.missingParams));
    });


})