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
      id: 1, tripId: 1, amount: 500, category: ExpenseCategory.Food
    },
    {
      id: 2, tripId: 1, amount: 1500, category: ExpenseCategory.Travel
    },
    {
      id: 3, tripId: 1, amount: 2000, category: ExpenseCategory.Stay
    },
    { 
      id: 4, tripId: 2, amount: 800, category: ExpenseCategory.Food
    },
    {
      id: 5, tripId: 2, amount: 500, category: ExpenseCategory.Travel
    },
    {
      id: 6, tripId: 2, amount: 1200, category: ExpenseCategory.Stay
    },
    {
      id: 7, tripId: 3, amount: 1500, category: ExpenseCategory.Food
    },
    {
      id: 8, tripId: 3, amount: 2000, category: ExpenseCategory.Travel
    },
    {
      id: 9, tripId: 3, amount: 3000,category: ExpenseCategory.Stay
    },
    {
      id: 10, tripId: 4, amount: 5000, category: ExpenseCategory.Food
    },
    {
      id: 11, tripId: 4, amount: 20000, category: ExpenseCategory.Travel
    },
    {
      id: 12, tripId: 4, amount: 15000, category: ExpenseCategory.Stay
    }
  ];

  private expensesSubject: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>(this.mockExpenses);
  expenses$ = this.expensesSubject.asObservable();

  constructor() { }

  getAllExpenses(): Expense[] {
    return this.expensesSubject.value;
  }

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

  updateExpense(updatedExpense: Expense) {
    const expenses = this.expensesSubject.value;
    const index = expenses.findIndex(e => e.id === updatedExpense.id);
    if (index !== -1) {
      expenses[index] = updatedExpense;
      this.expensesSubject.next([...expenses]);
    }
  }
  
  deleteExpense(id: number) {
    const expenses = this.expensesSubject.value;
    const updatedExpenses = expenses.filter(e => e.id !== id);
    this.expensesSubject.next(updatedExpenses);
  }

  deleteExpensesByTripId(tripId: number) {
    const expenses = this.expensesSubject.value;
    const updatedExpenses = expenses.filter(e => e.tripId !== tripId);
    this.expensesSubject.next(updatedExpenses);
  }
}
