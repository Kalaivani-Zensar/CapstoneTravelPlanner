import { Component, OnDestroy, OnInit } from '@angular/core';
import { TripService } from '../../services/trip-service';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-trips-component',
  imports: [CommonModule, MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './trips-component.html',
  styleUrl: './trips-component.css',
})
export class TripsComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  
  constructor(private tripService: TripService, private router: Router) {
  }

  ngOnInit() {
    this.getTrips();
  }

  ngOnDestroy() {
    // Cleanup logic
  }

  getTrips() {
    this.tripService.trips$.subscribe((trips)=> {
      this.trips = trips;
    });
  }

  manageExpense(tripId: number) {
    this.router.navigate(['/manage-expense', tripId]);
  }

  viewItinerary(tripId: number) {
    this.router.navigate(['/view-itinerary', tripId]);
  }
}
