import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { HostService } from '../../../services/host.service';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent implements OnInit {
  constructor(private hostService: HostService) {}
  ngOnInit(): void {
    
  }
}
