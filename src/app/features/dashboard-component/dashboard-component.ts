import { Component, OnInit } from '@angular/core';
import { BaseChartDirective  } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TripService } from '../../services/trip-service';
import { ExpenseCategory } from '../../shared/expense-category';
import { Trip } from '../../models/trip';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatCardModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

  trips: Trip[] = [];
  expenses: Expense[] = [];
  totalSpent = 0;
  totalBudget = 0;
  overspendPercent = 0;
  highestCategory = '';
  highestExpenseTrip = '';
  overSpentTripCount = 0;

  // ---------------- CATEGORY WISE EXPENSES ----------------
  categoryExpenseChartType: ChartType = 'pie';
  categoryExpenseChartData = {
    labels: [ExpenseCategory.Food, ExpenseCategory.Travel, ExpenseCategory.Stay],
    datasets: [{ data: [0, 0, 0]}]
  };

  categoryExpenseChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  // ---------------- TRIP WISE EXPENSES ----------------
  tripExpenseChartType: ChartType = 'bar';
  tripExpenseChartData = {
    labels: [] as string[],
    datasets: [{
      label: 'Total Expense',
      data: [] as number[]  
    }]
  };
  tripExpenseChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  // ---------------- BUDGET VS ACTUAL ----------------
  budgetChartType: ChartType = 'bar';
  budgetChartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Budget',
        data: [] as number[]
      },
      {
        label: 'Actual',
        data: [] as number[]
      }
    ]
  };
  budgetChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private tripService: TripService, private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadTrips();
    this.loadExpenses();
    this.generateDashboardData();
  }

  loadTrips() {
    this.trips = this.tripService.getAllTrips();
  }

  loadExpenses() {
    this.expenses = this.expenseService.getAllExpenses();
  }
  
  generateDashboardData() {
    let maxTripExpense = 0;
    const categoryTotals: { [key in ExpenseCategory]: number } = {
      [ExpenseCategory.Food]: 0, 
      [ExpenseCategory.Travel]: 0, 
      [ExpenseCategory.Stay]: 0 
    };

    this.trips.forEach(trip => {
      let tripTotal = 0;
      const tripExpenses = this.expenses.filter(e => e.tripId === trip.id);
      if (tripExpenses) {
        tripExpenses.forEach((expense: Expense) => {
          categoryTotals[expense.category] += expense.amount;
          tripTotal += expense.amount;
        });
      }

      // Trip wise expense data
      this.tripExpenseChartData.labels?.push(trip.destination);
      this.tripExpenseChartData.datasets[0].data.push(tripTotal);

      // Budget chart data
      this.budgetChartData.labels?.push(trip.destination);
      this.budgetChartData.datasets[0].data.push(trip.budgetAmount);
      this.budgetChartData.datasets[1].data.push(tripTotal);

      // Track highest expense trip
      if (tripTotal > maxTripExpense) {
        maxTripExpense = tripTotal;
        this.highestExpenseTrip = trip.destination;
      }

      // Count overspent trips
      if (tripTotal > trip.budgetAmount) {
        this.overSpentTripCount++;
      }

      this.totalSpent += tripTotal;
      this.totalBudget += trip.budgetAmount;
    });

    // Category wise Expense data
    this.categoryExpenseChartData = {
      labels: [ExpenseCategory.Food, ExpenseCategory.Travel, ExpenseCategory.Stay],
      datasets: [
      {
        data: [
          categoryTotals[ExpenseCategory.Food],
          categoryTotals[ExpenseCategory.Travel],
          categoryTotals[ExpenseCategory.Stay]
        ]
      }
    ]};

    // Find highest spending category
    let maxCategoryAmount = 0;
    (Object.keys(categoryTotals) as ExpenseCategory[]).forEach(category => {
      if (categoryTotals[category] > maxCategoryAmount) {
        maxCategoryAmount = categoryTotals[category];
        this.highestCategory = category;
      }
    });

    // Overspend %
    this.overspendPercent = ((this.totalSpent - this.totalBudget) / this.totalBudget) * 100;
  }
}