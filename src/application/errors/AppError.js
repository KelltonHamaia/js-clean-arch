module.exports = class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = "AppError";
    }

    static dependencies = "Some dependency is missing.";
    static missingParams = "Some required params are missing.";

}