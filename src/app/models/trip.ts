import { Expense } from "./expense";
import { Itinerary } from "./itinerary";

export class Trip {
    id: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    budgetAmount: number;
    itinerary: Itinerary[];
    expenses: Expense[];

    constructor(id: number, destination: string, startDate: Date, endDate: Date, budgetAmount: number) {
        this.id = id;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budgetAmount = budgetAmount;   
        this.itinerary = [];
        this.expenses = [];
    }
}