import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseCategory } from '../expense-category';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Expense } from '../../models/expense';
import { MatDialogActions } from '@angular/material/dialog';


@Component({
  standalone: true,
  selector: 'app-add-edit-expense-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatButtonModule, MatDialogActions
  ],
  templateUrl: './add-edit-expense-dialog.html',
  styleUrl: './add-edit-expense-dialog.css'
})

export class AddEditExpenseDialogComponent {

  expenseForm: FormGroup;
  expenseCategory = ExpenseCategory;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public expenseData: Expense,
  private dialogRef: MatDialogRef<AddEditExpenseDialogComponent>) {
    this.expenseForm = this.fb.group({
        category: ['', Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]]
    });

    if (this.expenseData) {
        this.isEdit = true;
        this.expenseForm.patchValue(this.expenseData);
        this.expenseForm.get('category')?.disable();
    }
}

  save(): void {
     if (this.expenseForm.valid) {
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
