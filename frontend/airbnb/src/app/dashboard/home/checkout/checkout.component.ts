import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../../../auth/login/login.component';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../../model/listing';
import { HostService } from '../../../services/host.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  propertyId!: number;
  properties: Property[] = [];
  activeProperty!: Property

  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private hostService : HostService
  ) {}
  ngOnInit(): void {
    this.layoutService.setHideMainMenu(true);
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    this.hostService.getAllActiveProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.activeProperty = this.properties.find(
          (prop) => prop.id === this.propertyId
        )!;
       
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      },
    });
  }

  goBack() {
    window.history.back();
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
