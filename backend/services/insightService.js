export const generateAdminInsights = (expenses) => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    let message = "";

    if (total > 50000) {
        message = "⚠️ Platform spending is very high";
    } else {
        message = "✅ Platform spending is stable";
    }

    return {
        total,
        message
    };
};