import { ExpenseCategory } from '../shared/expense-category';

export class Expense {
    id: number;
    tripId: number;
    category: ExpenseCategory;
    amount: number;

    constructor(id: number, tripId: number, category: ExpenseCategory, amount: number) {
        this.id = id;
        this.tripId = tripId;
        this.category = category;
        this.amount = amount;
    }
}