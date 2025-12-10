import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent implements OnInit {
  constructor(private hostService: HostService) {}

  property : Property[] = [];

  ngOnInit(): void {
    this.property = this.hostService.MOCK_PROPERTIES; 
  }

  trackById(index: number, item: Property): number {
    return item.id;
  }
}
