import { Component, OnInit } from '@angular/core';
import { HostService } from '../../services/host.service';
import { Property } from '../../model/listing';
import { UserService } from '../../services/user.service';
import { combineLatest } from 'rxjs';
import { CardComponent } from '../../dashboard/home/card/card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-host-listing',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './host-listing.component.html',
  styleUrl: './host-listing.component.css',
})
export class HostListingComponent implements OnInit {
  properties: Property[] = [];

  constructor(
    private hostService: HostService,
    private userService: UserService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.hostService.setSelectedHostMenu('myListing');
    combineLatest([
      this.hostService.getAllActiveProperties(),
      this.userService.activeUser$,
    ]).subscribe(([properties, activeHost]) => {
      if (!activeHost) return;

      this.properties = properties.filter((p) => p.hostId === activeHost.id);

      console.log('Host properties:', this.properties);
    });
  }

  trackById(index: number, item: Property): number {
    return item.id;
  }

  onSelectProperty(selectedProperty: Property) {
    this.router.navigate(['/property', selectedProperty.id]);
  }

  editProperty(property: Property) {
    console.log('Edit', property);
  }

  deleteProperty(id: number) {
    console.log('Delete', id);
  }

  

  
}
