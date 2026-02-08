import { Routes } from '@angular/router';
import { TripsComponent } from './features/trips-component/trips-component';
import { DashboardComponent } from './features/dashboard-component/dashboard-component';
import { AddTripComponent } from './features/add-trip-component/add-trip-component';
import { ViewItineraryComponent } from './features/view-itinerary-component/view-itinerary-component';
import { ManageExpenseComponent } from './features/manage-expense-component/manage-expense-component';

export const routes: Routes = [ 
    { path: '', component: TripsComponent},
    { path: 'add-trip', component: AddTripComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'view-itinerary/:id', component: ViewItineraryComponent},
    { path: 'manage-expense/:id', component: ManageExpenseComponent},
];
