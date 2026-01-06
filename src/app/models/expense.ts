export class Expense {
    id: number;
    tripId: number;
    category: string;
    amount: number;

    constructor(id: number, tripId: number, category: string, amount: number) {
        this.id = id;
        this.tripId = tripId;
        this.category = category;
        this.amount = amount;
    }
}