import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';


@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit {
  isHomePage: boolean = false;
  constructor(private layoutServie : LayoutService) { }
  ngOnInit(): void {
    this.layoutServie.isHomePage$.subscribe({
      next: (isHome) => {
        this.isHomePage = isHome;
      }
    });       
  }

  
}
