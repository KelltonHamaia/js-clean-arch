const searchBookByIsbnOrNameUseCase = require("./search-book-by-isbn-or-name");

describe("Search Book by ISBN or Name", () => {
    const bookRepository = {
        findByIsbnOrName: jest.fn()
    };

    it("Should return a book by ISBN or Name", async () => {

        const bookSearchDTO = {
            value: "valid_isbn"
        };

        const outputDTO = [{
            id: "valid_id",
            name: "valid_name",
            isbn: "valid_isbn",
            author: "valid_author",
            genre: "valid_genre",
        }];

        bookRepository.findByIsbnOrName.mockResolvedValue(outputDTO);

        const sut = searchBookByIsbnOrNameUseCase({ bookRepository });

        const output = await sut(bookSearchDTO);

        expect(output.right).toEqual(outputDTO);
        expect(bookRepository.findByIsbnOrName).toHaveBeenCalledWith(bookSearchDTO.value);
        expect(bookRepository.findByIsbnOrName).toHaveBeenCalledTimes(1);
    });

    it("Should return an empty array if no book is found", async () => {
        
        const bookSearchDTO = {
            value: "invalid_isbn"
        };

        bookRepository.findByIsbnOrName.mockResolvedValue([]);

        const sut = searchBookByIsbnOrNameUseCase({ bookRepository });
        const output = await sut(bookSearchDTO);

        expect(output.right).toEqual([]);
        expect(bookRepository.findByIsbnOrName).toHaveBeenCalledTimes(1);
        expect(bookRepository.findByIsbnOrName).toHaveBeenCalledWith(bookSearchDTO.value);

    })

});
