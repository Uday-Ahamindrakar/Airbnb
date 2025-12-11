import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit {

  propertyId!: number;
  properties: Property[] = [];
  activeProperty!: Property;

  constructor(private layoutService : LayoutService, private route: ActivatedRoute, private hostService: HostService) { }

  ngOnInit(): void {
    this.layoutService.setHomePage(false);
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    this.hostService.getAllActiveProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.activeProperty = this.properties.find(prop => prop.id === this.propertyId)!;
        // console.log("Fetched properties from backend:", this.properties);
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      },
    });
  }

}
