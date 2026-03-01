import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip-service';
import { ExpenseService } from '../../services/expense-service';
import { Trip } from '../../models/trip';
import { Expense } from '../../models/expense';
import { DatePipe } from '@angular/common';
import { BaseChartDirective  } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ExpenseCategory } from '../../models/expense-category-enum';
import { TitleCasePipe } from '@angular/common';
import { AddEditExpenseDialogComponent } from '../../shared/dialogs/add-edit-expense-dialog/add-edit-expense-dialog';
import { BackButtonComponent } from '../../shared/back-button-component/back-button-component';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-manage-expense-component',
  imports: [DatePipe, TitleCasePipe, BaseChartDirective, MatCardModule, MatButtonModule, 
    MatIconModule, MatDividerModule, BackButtonComponent],
  templateUrl: './manage-expense-component.html',
  styleUrl: './manage-expense-component.css',
})
export class ManageExpenseComponent implements OnInit {

  tripId: number = 0;
  tripDetails: Trip | null = null;
  tripExpenses: Expense[] = [];
  chartType: ChartType = 'pie';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  pieChartData = {
    labels: [ExpenseCategory.Food, ExpenseCategory.Travel, ExpenseCategory.Stay],
    datasets: [{ data: [0,0,0]}]
  }
  totalExpense: number = 0;
  remainingBudget: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService, 
    private expenseService: ExpenseService, private dialog: MatDialog) 
  { 
    this.activatedRoute.params.subscribe(params => {
      this.tripId = +params['id'];
      this.getTripById();
      this.getExpensesForTrip();
    });
  }

  ngOnInit() { }

  getTripById() {
    this.tripDetails = this.tripService.getTripById(this.tripId);
  }

  getExpensesForTrip() { 
    this.tripExpenses = this.expenseService.getExpensesByTripId(this.tripId);
    this.loadChartData();
  }

  loadChartData() {
    const summary = { 
      [ExpenseCategory.Food]: 0, 
      [ExpenseCategory.Travel]: 0, 
      [ExpenseCategory.Stay]: 0 
    };
    this.tripExpenses.forEach(e => {
      summary[e.category] += e.amount;
    });

    this.pieChartData = {
      labels: [ExpenseCategory.Food, ExpenseCategory.Travel, ExpenseCategory.Stay],
      datasets: [
      {
        data: [
          summary[ExpenseCategory.Food],
          summary[ExpenseCategory.Travel],
          summary[ExpenseCategory.Stay]
        ]
      }
    ]};

    this.totalExpense = this.tripExpenses.reduce((sum, e) => sum + e.amount, 0);
    this.remainingBudget = this.tripDetails?.budgetAmount ? this.tripDetails.budgetAmount - this.totalExpense : 0;
  }


  openAddExpense() {
     const dialogRef = this.dialog.open(AddEditExpenseDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(newExpense => {
      if (newExpense) {
       newExpense.tripId = this.tripId;
       this.expenseService.addExpense(newExpense);
       this.getExpensesForTrip();
      }
    });
  }

  openEditExpense(expense: Expense) {
   const dialogRef = this.dialog.open(AddEditExpenseDialogComponent, {
    width: '400px',
    data: expense
  });

  dialogRef.afterClosed().subscribe(updateExpense => {
    if (updateExpense) {
      expense.amount = updateExpense.amount;
      this.expenseService.updateExpense(expense);
      this.getExpensesForTrip();
    }
   });
 }

  deleteExpense(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '350px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this expense?'
      }
    }); 

     dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(id);
        this.getExpensesForTrip();  
      }
    });
  }
}
