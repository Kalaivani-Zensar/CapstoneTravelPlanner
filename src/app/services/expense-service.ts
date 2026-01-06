import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpenseCategory } from '../shared/expense-category';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  
  private mockExpenses: Expense[] = [
    {
      id: 1,
      tripId: 1,
      amount: 1500,
      category: ExpenseCategory.Travel
    },
    {
      id: 2,
      tripId: 1,
      amount: 2000,
      category: ExpenseCategory.Stay
    },
    {
      id: 3,
      tripId: 1,
      amount: 500,
      category: ExpenseCategory.Food
    },
     {
      id: 4,
      tripId: 2,
      amount: 500,
      category: ExpenseCategory.Travel
    },
    {
      id: 5,
      tripId: 2,
      amount: 1200,
      category: ExpenseCategory.Stay
    },
    { 
      id: 6,  
      tripId: 2,
      amount: 300,
      category: ExpenseCategory.Food
    }
  ];

  private expensesSubject: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>(this.mockExpenses);
  expenses$ = this.expensesSubject.asObservable();

  constructor() { }

  getExpensesByTripId(tripId: number): Expense[] {
    const expenses = this.expensesSubject.value;
    return expenses.filter(e => e.tripId === tripId);
  }

  addExpense(expense: Expense) {
    const existingExpenses =  this.expensesSubject.value;
    const existingTripExpense = existingExpenses.find(e => e.tripId === expense.tripId && e.category === expense.category);
    if (existingTripExpense) {
      existingTripExpense.amount += expense.amount;
      this.expensesSubject.next([...existingExpenses])
    }
    else {
      expense.id = existingExpenses.length + 1;
      this.expensesSubject.next([...existingExpenses, expense]);
    }
  }

  removeExpense(id: number) {
    const expenses = this.expensesSubject.value;
    const updatedExpenses = expenses.filter(e => e.id !== id);
    this.expensesSubject.next(updatedExpenses);
  }

}
