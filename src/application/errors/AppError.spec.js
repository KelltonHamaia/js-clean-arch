const AppError = require("./AppError");
describe("AppError", () => {

    it("Should be an instance of Error", () => {
        const appError = new AppError("");
        expect(appError).toBeInstanceOf(Error)
    });

    it("Should return a message saying 'Some dependency is missing.'", () => {
        const appError = new AppError(AppError.dependencies);
        expect(appError.message).toBe(AppError.dependencies)
    });

});