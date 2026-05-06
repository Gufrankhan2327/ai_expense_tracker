import API from "./api";

export const getExpenses = () => API.get("/expenses");
export const addExpense = (data) => API.post("/expenses/add", data);