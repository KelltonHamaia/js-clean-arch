const loanEntity = () => {
    function calculateLateDays({ returnBookDate, returnDate }) {
        return new Date(returnBookDate).getTime() < new Date(returnDate).getTime();
    }

    const calculateFine =({ returnBookDate, returnDate }) => {
        const lateDays = calculateLateDays({ returnBookDate, returnDate });
        if(lateDays) {
            return "Fine Applied: $10.00"
        } else {
            return "Fine not applied"
        }
    }

    return { calculateFine }
}

module.exports = loanEntity();