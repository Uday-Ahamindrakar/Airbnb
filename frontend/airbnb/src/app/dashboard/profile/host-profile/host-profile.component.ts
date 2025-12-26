import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { CommonModule } from '@angular/common';
import { HostService } from '../../../services/host.service';
import { EditProfileComponent } from '../../layout/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-host-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './host-profile.component.html',
  styleUrl: './host-profile.component.css'
})
export class HostProfileComponent implements OnInit{

  user !: User;

  constructor(private userService : UserService, private hostService : HostService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.hostService.setSelectedHostMenu('profile');
    this.userService.activeUser$.subscribe((data)=>{
      if(data){
        this.user = data;
      }
    })
  }
  openAddPropertyDialog() {
        const dialogRef = this.dialog.open(EditProfileComponent, {
          width: '600px',
          maxHeight: '95vh',
          disableClose: true,
          panelClass: 'airbnb-dialog'
        });
      }

}
