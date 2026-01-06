import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {

  private mockTrips: Trip[] = [{
    id: 1,
    destination: 'Gokarna',
    startDate: new Date('2025-07-20'),
    endDate: new Date('2025-07-25'),
  },
  {
    id: 2,
    destination: 'Ooty',
    startDate: new Date('2025-10-11'),
    endDate: new Date('2025-10-13'),
  },
  {
    id: 3,
    destination: 'Coorg',
    startDate: new Date('2025-12-01'),
    endDate: new Date('2025-12-06'),
  },
  {
    id: 4,
    destination: 'Vietnam',
    startDate: new Date('2025-12-20'),
    endDate: new Date('2025-12-30'),
  }];

  private tripSubject: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>(this.mockTrips);
  trips$ = this.tripSubject.asObservable();

  constructor() { }

  addTrip(trip: Trip) {
    const existingTrips =  this.tripSubject.value;
    if (!existingTrips.some(t => t.destination === trip.destination)) {
      trip.id = existingTrips.length + 1;
      this.tripSubject.next([...existingTrips, trip]);
    }
    else {
      console.error('Trip to this destination already exists.');
    }
  }

  getTripById(id: number): Trip | null {
    const trips = this.tripSubject.value;
    const trip = trips.find(t => t.id === id);
    return trip ? trip : null;
  }

  removeTrip(id: number) {
    const trips = this.tripSubject.value;
    const updatedTrips = trips.filter(t => t.id !== id);
    this.tripSubject.next(updatedTrips);
  }
}
