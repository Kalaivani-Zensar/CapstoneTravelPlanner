import { Routes } from '@angular/router';
import { TripsComponent } from './features/trips-component/trips-component';
import { DashboardComponent } from './features/dashboard-component/dashboard-component';
import { AddEditTripComponent } from './features/add-edit-trip-component/add-edit-trip-component';
import { ViewItineraryComponent } from './features/view-itinerary-component/view-itinerary-component';
import { ManageExpenseComponent } from './features/manage-expense-component/manage-expense-component';

export const routes: Routes = [ 
    { path: '', component: TripsComponent},
    { path: 'add-trip', component: AddEditTripComponent},
    { path: 'edit-trip/:id', component: AddEditTripComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'trip/:id/itinerary', component: ViewItineraryComponent},
    { path: 'trip/:id/manage-expense', component: ManageExpenseComponent},
];
