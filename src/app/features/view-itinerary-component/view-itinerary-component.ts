import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TripService } from '../../services/trip-service';
import { Itinerary } from '../../models/itinerary';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { BackButtonComponent } from '../../shared/back-button-component/back-button-component';

@Component({
  selector: 'app-view-itinerary-component',
  imports: [MatExpansionModule, RouterLink, MatIcon, BackButtonComponent],
  templateUrl: './view-itinerary-component.html',
  styleUrl: './view-itinerary-component.css',
})
export class ViewItineraryComponent {

  tripName: string = '';
  tripId: number = 0;
  itineraryArray: Itinerary[] = [];

  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.tripId = +params['id'];
      const tripDetails = this.tripService.getTripById(this.tripId);
      this.tripName = tripDetails?.destination || '';
      this.itineraryArray = tripDetails?.itinerary || [];
    });
  }

  openEditTrip() {
    this.router.navigate(['/edit-trip', this.tripId]);
  }
}