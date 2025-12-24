import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostService } from '../../services/host.service';
import { MatDialog } from '@angular/material/dialog';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guest-menu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './guest-menu.component.html',
  styleUrl: './guest-menu.component.css'
})
export class GuestMenuComponent {

   activeMenu: String = 'profile';
  
    constructor(private router : Router, private hostService: HostService, private dialog: MatDialog){
  
    }
    ngOnInit(): void {
      this.hostService.selectedHostMenu$.subscribe((data)=>{
        this.activeMenu = data;
      })
    }
    
  
    profile(){
      this.router.navigate(['/host-dashboard/']);
    }
  
    hostListing(){
      this.router.navigate(['/host-dashboard/mylisting']);
    }
  
    
}
