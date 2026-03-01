import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip-service';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { ExpenseService } from '../../services/expense-service';


@Component({
  selector: 'app-trip-list-component',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIcon, DatePipe],
  templateUrl: './trip-list-component.html',
  styleUrl: './trip-list-component.css',
})
export class TripListComponent implements OnInit {
  
  trips: Trip[] = [];
  
  constructor(private tripService: TripService, private expenseService: ExpenseService,
    private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.tripService.trips$.subscribe((trips)=> {
      this.trips = trips;
    });
  }

  editTrip(tripId: number) {
    this.router.navigate(['/edit-trip', tripId]);
  }

  deleteTrip(tripId: number) {
  const dialogRef = this.dialog.open(ConfirmationDialog, {
    width: '350px',
    data: {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this trip?'
    }
   });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tripService.deleteTrip(tripId);
        this.expenseService.deleteExpensesByTripId(tripId);
        this.getTrips();
      }
    });
  }

  manageExpense(tripId: number) {
    this.router.navigate(['trip', tripId, 'manage-expense']);
  }

  viewItinerary(tripId: number) {
    this.router.navigate(['trip', tripId, 'itinerary']);
  }
}
