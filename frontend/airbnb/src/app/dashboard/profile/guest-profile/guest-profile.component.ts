import { Component } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { HostService } from '../../../services/host.service';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from '../../../host-dashboard/add-property/add-property.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../../layout/edit-profile/edit-profile.component';

@Component({
  selector: 'app-guest-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-profile.component.html',
  styleUrl: './guest-profile.component.css'
})
export class GuestProfileComponent {


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
