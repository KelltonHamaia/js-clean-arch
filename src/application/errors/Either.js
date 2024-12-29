/**
 * @description Do not create an instance of this class. Use the static methods instead.
 */

module.exports = class Either {
    constructor(left, right)  {
        this.left = left;
        this.right = right;
    }

    static Left(left) {
        return new Either(left, null);
    }

    static Right(right) {
        return new Either(null, right);
    }

    static FieldAlreadyTaken(message) {
        return {
            message: `Campo ${message} já está sendo utilizado.`
        }
    }

}