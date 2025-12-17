import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HostService } from '../../services/host.service';


@Component({
  selector: 'app-host-menu',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './host-menu.component.html',
  styleUrl: './host-menu.component.css'
})
export class HostMenuComponent implements OnInit{

  activeMenu: String = 'profile';

  constructor(private router : Router, private hostService: HostService){

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
}
