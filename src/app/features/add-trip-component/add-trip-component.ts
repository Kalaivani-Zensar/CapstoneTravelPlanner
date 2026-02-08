import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../../services/trip-service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { dateRangeValidator } from '../../custom-validators/date-range-validator';

@Component({
  selector: 'app-add-trip-component',
  imports: [CommonModule, RouterLink, ReactiveFormsModule,MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, 
    MatNativeDateModule, MatDividerModule],
  templateUrl: './add-trip-component.html',
  styleUrl: './add-trip-component.css',
})
export class AddTripComponent implements OnInit {

  tripForm: FormGroup;

  constructor(private tripService: TripService, private formBuilder: FormBuilder, private router: Router) 
  {
    this.tripForm = this.formBuilder.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budgetAmount: [null, [Validators.required, Validators.min(1)]],
      itinerary: this.formBuilder.array([]) 
    }, { validators: dateRangeValidator });
  }

  ngOnInit() {
    
    this.tripForm.get('startDate')?.valueChanges.subscribe(() => {
      this.generateItinerary();
    });

    this.tripForm.get('endDate')?.valueChanges.subscribe(() => {
      this.generateItinerary();
    });
  }

  get itinerary(): FormArray {
    return this.tripForm?.get('itinerary') as FormArray;
  }

  get showItinerary(): boolean {
    const start = this.tripForm.get('startDate')?.value;
    const end = this.tripForm.get('endDate')?.value;
    return start && end && end >= start;
 }

  generateItinerary() {
    const start = this.tripForm.get('startDate')?.value;
    const end = this.tripForm.get('endDate')?.value;

    if (!start || !end || end < start) {
      this.itinerary.clear();
      return;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < totalDays; i++) {
      this.itinerary.push(
        this.formBuilder.group({
          title: [`Day ${i + 1}`],
          activities: ['']
        })
      );
    }
  }

  addTrip() {
    if (this.tripForm?.invalid) {
      return;
    }
    const newTrip = this.tripForm?.value;
    console.log(newTrip);
    this.tripService.addTrip(newTrip);
    this.router.navigate(['/']);
  }
}
