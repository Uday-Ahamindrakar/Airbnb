import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent implements OnInit {
  constructor(private hostService: HostService, private router: Router) {}

  property: Property[] = [];

  ngOnInit(): void {
    this.hostService.getAllActiveProperties().subscribe({
      next: (data) => {
        this.property = data;
        // console.log("Fetched properties from backend:", this.property);
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      },
    });
  }

  trackById(index: number, item: Property): number {
    return item.id;
  }

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  }

  onSelectProperty(selectedProperty: Property) {
    this.router.navigate(['/property', selectedProperty.id]);
    // console.log('Selected property:', selectedProperty);
  }
}
