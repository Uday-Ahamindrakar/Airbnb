import { Component, OnInit } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { LayoutService } from '../../../services/layout.service';
import { UserService } from '../../../services/user.service';
import { CityGroup } from '../../../model/city-group';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListingCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private userService: UserService,
    private hostService: HostService
  ) {}


  cityGroups: CityGroup[] = [];

  
  pagedCityGroups: CityGroup[] = [];

  pageSize: number = 3;
  currentPage: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.layoutService.setHomePage(true);

    this.hostService.getAllActiveProperties().subscribe({
      next: (data) => {
        this.cityGroups = this.groupByCity(data);

        
        this.totalPages = Math.ceil(this.cityGroups.length / this.pageSize);
        this.currentPage = 0;
        this.updatePage();
      },
      error: (err) => console.error(err),
    });
  }

  private updatePage(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCityGroups = this.cityGroups.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage();
    }
  }

  private groupByCity(properties: Property[]): CityGroup[] {
    const map = new Map<string, Property[]>();

    properties.forEach((property) => {
      if (!map.has(property.city)) {
        map.set(property.city, []);
      }
      map.get(property.city)!.push(property);
    });

    return Array.from(map.entries()).map(([city, properties]) => ({
      city,
      properties,
    }));
  }
}
