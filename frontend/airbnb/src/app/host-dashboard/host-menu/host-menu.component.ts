import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HostService } from '../../services/host.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';


@Component({
  selector: 'app-host-menu',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './host-menu.component.html',
  styleUrl: './host-menu.component.css'
})
export class HostMenuComponent implements OnInit{

  activeMenu: String = 'profile';

  constructor(private router : Router, private hostService: HostService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.hostService.selectHostMunu$.subscribe((data)=>{
      this.activeMenu = data;
    })
  }
  

  profile(){
    this.router.navigate(['/host-dashboard/']);
  }

  hostListing(){
    this.router.navigate(['/host-dashboard/mylisting']);
  }

  openAddPropertyDialog() {
  const dialogRef = this.dialog.open(AddPropertyComponent, {
    width: '600px',
    maxHeight: '95vh',
    disableClose: true,
    panelClass: 'airbnb-dialog'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Property payload:', result);
    }
  });
}
}
