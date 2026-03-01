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
import { dateRangeValidator } from '../../validators/date-range-validator';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../models/trip';
import { BackButtonComponent } from '../../shared/back-button-component/back-button-component';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-trip-component',
  imports: [CommonModule, RouterLink, ReactiveFormsModule,MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, 
    MatNativeDateModule, MatDividerModule, BackButtonComponent],
  templateUrl: './add-edit-trip-component.html',
  styleUrl: './add-edit-trip-component.css',
})
export class AddEditTripComponent implements OnInit {

  tripForm: FormGroup;
  isEdit: boolean = false;
  tripId: number = 0;
  tripDetails: Trip | null = null;

  constructor(private tripService: TripService, private formBuilder: FormBuilder, 
    private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) 
  {
     this.tripForm = this.formBuilder.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budgetAmount: [null, [Validators.required, Validators.min(1)]],
      itinerary: this.formBuilder.array([]) 
    }, { validators: dateRangeValidator });

    this.activatedRoute.params.subscribe(params => {
      this.tripId = +params['id'];
      if (this.tripId) {
       this.tripDetails = this.tripService.getTripById(this.tripId);
       if (this.tripDetails) {
         this.isEdit = true;
         this.tripForm.patchValue(this.tripDetails);
          if (this.tripDetails.itinerary) {
            this.patchItinerary();
          }
        }
      }
    });
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

 
  patchItinerary() {
      const itineraryArray = this.itinerary;
      itineraryArray.clear();

      if (this.tripDetails?.itinerary.length) {
        this.tripDetails?.itinerary.forEach((day: any) => {
            itineraryArray.push(
              this.formBuilder.group({
                title: [day.title],
                activity: [day.activity]
              })
            );
        });
    }
    else {
      this.generateItinerary();
    }
  }

  generateItinerary() {
    const start = new Date(this.tripForm.get('startDate')?.value);
    const end = new Date(this.tripForm.get('endDate')?.value);

    if (!start || !end || end < start) return;

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const itineraryArray = this.itinerary;

    if (this.isEdit) {
      // Remove extra days if end date reduced
      while (itineraryArray.length > totalDays) {
        itineraryArray.removeAt(itineraryArray.length - 1);
      }

    // Add missing days if end date increased
      while (itineraryArray.length < totalDays) {
        itineraryArray.push(
          this.formBuilder.group({
            title: [`Day ${itineraryArray.length + 1}`],
            activity: ['']
          })
        );
      }
    } 
    else {
      itineraryArray.clear();
      for (let i = 0; i < totalDays; i++) {
        itineraryArray.push(
          this.formBuilder.group({
            title: [`Day ${i + 1}`],
            activity: ['']
          })
        );
      }
    }
  }
  
  addTrip() {
    const newTrip = this.tripForm?.value;
    this.tripService.addTrip(newTrip);
    this.router.navigate(['/']);
  }

  updateTrip() {
     const dialogRef = this.dialog.open(ConfirmationDialog, {
        width: '350px',
        data: {
          title: 'Confirm Update',
          message: 'Are you sure you want to update this trip?'
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedTrip = this.tripForm?.value;
          updatedTrip.id = this.tripId;
          this.tripService.updateTrip(updatedTrip);
          this.router.navigate(['/']);
        }
      });
   }
}
