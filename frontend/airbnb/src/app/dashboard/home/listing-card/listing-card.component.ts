import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';
import { Router } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent implements OnInit {
  constructor(
    private hostService: HostService,
    private router: Router,
    private layoutService: LayoutService
  ) {}

  // property: Property[] = [];
  @Input() city!: string;
  @Input() property: Property[] = [];

  ngOnInit(): void {
    this.layoutService.setHideMainMenu(false);
    // this.hostService.getAllActiveProperties().subscribe({
    //   next: (data) => {
    //     this.property = data;
    //     // console.log("Fetched properties from backend:", this.property);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching properties:', error);
    //   },
    // });
  }

  trackById(index: number, item: Property): number {
    return item.id;
  }

  // @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  // scrollLeft() {
  //   this.scrollContainer.nativeElement.scrollBy({
  //     left: -500,
  //     behavior: 'smooth',
  //   });
  // }

  // scrollRight() {
  //   this.scrollContainer.nativeElement.scrollBy({
  //     left: 500,
  //     behavior: 'smooth',
  //   });
  // }

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

scrollLeft() {
  this.scrollContainer.nativeElement.scrollBy({
    left: -400, // adjust based on card width + gap
    behavior: 'smooth',
  });
}

scrollRight() {
  this.scrollContainer.nativeElement.scrollBy({
    left: 400,
    behavior: 'smooth',
  });
}

  onSelectProperty(selectedProperty: Property) {
    this.router.navigate(['/property', selectedProperty.id]);
    // console.log('Selected property:', selectedProperty);
  }
}
