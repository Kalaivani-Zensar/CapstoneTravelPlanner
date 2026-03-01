import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {

  private mockTrips: Trip[] = [{
    id: 1,
    destination: 'Gokarna',
    startDate: new Date('2025-07-20'),
    endDate: new Date('2025-07-22'),
    budgetAmount: 3000,
    itinerary: [{ id: 1, tripId: 1, title: 'Day 1', activity: 'Beach day at Om Beach' },
                { id: 2, tripId: 1, title: 'Day 2', activity: 'Visit to Mirjan Fort' },
                { id: 3, tripId: 1, title: 'Day 3', activity: 'Explore Kudle Beach' }]
  },
  {
    id: 2,
    destination: 'Ooty',
    startDate: new Date('2025-10-11'),
    endDate: new Date('2025-10-13'),
    budgetAmount: 5000,
    itinerary: [{ id: 1, tripId: 2, title: 'Day 1', activity: 'Visit to Botanical Gardens' },
                { id: 2, tripId: 2, title: 'Day 2', activity: 'Boat ride in Ooty Lake' },
                { id: 3, tripId: 2, title: 'Day 3', activity: 'Explore Doddabetta Peak' }]
  },
  {
    id: 3,
    destination: 'Coorg',
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-11-05'),    
    budgetAmount: 8000,
    itinerary: [{ id: 1, tripId: 3, title: 'Day 1', activity: 'Visit to Abbey Falls' },
                { id: 2, tripId: 3, title: 'Day 2', activity: 'Explore coffee plantations' },
                { id: 3, tripId: 3, title: 'Day 3', activity: 'Trek to Tadiandamol Peak' },
                { id: 4, tripId: 3, title: 'Day 4', activity: 'Visit to Raja\'s Seat' },
                { id: 5, tripId: 3, title: 'Day 5', activity: 'Relax at Madikeri Fort' }]
  },
  {
    id: 4,
    destination: 'Vietnam',
    startDate: new Date('2025-12-04'),
    endDate: new Date('2025-12-09'),
    budgetAmount: 50000,
    itinerary: [{ id: 1, tripId: 4, title: 'Day 1', activity: 'Explore Hanoi Old Quarter' },
                { id: 2, tripId: 4, title: 'Day 2', activity: 'Visit to Halong Bay' },
                { id: 3, tripId: 4, title: 'Day 3', activity: 'Discover Hoi An Ancient Town' },
                { id: 4, tripId: 4, title: 'Day 4', activity: 'Experience Ho Chi Minh City' },
                { id: 5, tripId: 4, title: 'Day 5', activity: 'Relax at Phu Quoc Island' }],
  }];

  private tripSubject: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>(this.mockTrips);
  trips$ = this.tripSubject.asObservable();

  constructor() { }

  getTripById(id: number): Trip | null {
    const trips = this.tripSubject.value;
    const trip = trips.find(t => t.id === id);
    return trip ? trip : null;
  }

  getAllTrips(): Trip[] {
    return this.tripSubject.value;
  }

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

  updateTrip(updatedTrip: Trip) {
    const trips = this.tripSubject.value;
    const index = trips.findIndex(t => t.id === updatedTrip.id);
    if (index !== -1) {
      trips[index] = updatedTrip;
      this.tripSubject.next([...trips]);
    }
  }

  deleteTrip(id: number) {
    const trips = this.tripSubject.value;
    const updatedTrips = trips.filter(t => t.id !== id);
    this.tripSubject.next(updatedTrips);
  }
}
