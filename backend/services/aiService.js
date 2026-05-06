// services/aiService.js

const categories = {
    food: ["zomato", "swiggy", "pizza", "burger", "restaurant"],
    transport: ["uber", "ola", "bus", "train", "petrol"],
    shopping: ["amazon", "flipkart", "clothes", "shopping"],
    bills: ["electricity", "rent", "wifi", "recharge"]
};

function categorizeExpense(note = "") {
    const text = note.toLowerCase();

    for (let category in categories) {
        for (let keyword of categories[category]) {
            if (text.includes(keyword)) {
                return category;
            }
        }
    }

    return "other";
}

export { categorizeExpense }; 