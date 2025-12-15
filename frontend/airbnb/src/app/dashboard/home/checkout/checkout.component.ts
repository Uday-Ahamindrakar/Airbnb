import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../../../auth/login/login.component';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  constructor(private layoutService : LayoutService,private dialog: MatDialog) { }
  ngOnInit(): void {
     this.layoutService.setHideMainMenu(true);
  }

  goBack(){
    window.history.back();
  }

  

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
