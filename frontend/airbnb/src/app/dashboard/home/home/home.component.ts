import { Component, OnInit } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListingCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private layoutService : LayoutService) { }
  ngOnInit(): void {
    this.layoutService.setHomePage(true);
  }

}
