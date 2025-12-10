import { Component } from '@angular/core';
import { Listing } from '../../../model/listing';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent {


}
