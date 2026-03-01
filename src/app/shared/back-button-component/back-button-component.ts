import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button mat-icon-button (click)="goBack()">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}