import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit {
  isHomePage: boolean = false;
  hideMainMenu: boolean = false;
  constructor(
    private layoutServie: LayoutService,
    private router: Router,
    private el: ElementRef,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.layoutServie.isHomePage$.subscribe({
      next: (isHome) => {
        this.isHomePage = isHome;
      },
    });

    this.layoutServie.hideMenu$.subscribe({
      next: (hideMenu) => {
        this.hideMainMenu = hideMenu;
      },
    });
  }

  navigateToHomePage() {
    this.router.navigate(['']);
    
  }

 

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  openLogin() {
    this.close();
      this.dialog.open(LoginComponent, {
        width: '400px',
        disableClose: true
      });
    }
}
