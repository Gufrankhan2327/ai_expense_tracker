export const categorizeExpense = (note) => {
    const categories = {
        food: ["zomato", "swiggy", "pizza", "burger"],
        transport: ["uber", "bus", "petrol"],
        shopping: ["amazon", "flipkart"],
        bills: ["electricity", "rent", "wifi"],
    };

    const text = note.toLowerCase();

    for (let cat in categories) {
        for (let keyword of categories[cat]) {
            if (text.includes(keyword)) return cat;
        }
    }

    return "other";
};