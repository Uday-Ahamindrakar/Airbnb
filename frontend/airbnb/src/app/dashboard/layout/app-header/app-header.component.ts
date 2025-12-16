import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../auth/login/login.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import {Role} from '../../../model/role'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent implements OnInit {
  isHomePage: boolean = false;
  hideMainMenu: boolean = true;

  userLoggedIn: boolean = false;
  user : User = {
    id: 0,
      name: "",
      email: "",
      password: '',
      phone: "",
      created_at: "", // ISO date string from backend
      roles: []
  }

  constructor(
    private layoutServie: LayoutService,
    private router: Router,
    private el: ElementRef,
    private dialog: MatDialog,
    private userService: UserService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.userService.showLogin$.subscribe(() => {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  });

    this.userService.loggedIn$.subscribe({
      next: (loggedIn) => {
        this.userLoggedIn = loggedIn;
      },
    });

    this.layoutServie.isHomePage$.subscribe((isHome) => {
      this.isHomePage = isHome;
    });

    this.layoutServie.hideMenu$.subscribe((hide) => {
      this.hideMainMenu = hide;
    });

    this.userService.activeUser$.subscribe((data)=>{
      if(data){
        this.user = data;
        console.log("Header component : "+data);
      }
    })
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
      disableClose: true,
    });
  }

  logout() {
  this.close();
  this.userService.logout(); 
  this.router.navigate(['/home']);
  this.toaster.success('Logout successful!');
}
}
