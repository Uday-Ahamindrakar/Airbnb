import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from '../../../services/host.service';
import { Property } from '../../../model/listing';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar/calendar.component';
import { A11yModule } from '@angular/cdk/a11y';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, CalendarComponent, A11yModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent implements OnInit {
  propertyId!: number;
  properties: Property[] = [];
  activeProperty!: Property;
  disableReserveButton: boolean = false;
  hostNameData !: string;

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private hostService: HostService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.layoutService.setHomePage(false);
    this.layoutService.setHideMainMenu(false);
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    this.hostService.getAllActiveProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.activeProperty = this.properties.find(
          (prop) => prop.id === this.propertyId

         
        )!;

        if(this.activeProperty){
           this.hostService.getHostNameById(this.activeProperty.hostId).subscribe((host_name)=>{
            this.hostNameData = host_name;
          })
        }
       
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      },
    });

    this.userService.setProperty(this.activeProperty);

    this.userService.activeUser$.subscribe((data)=>{
      if(data?.roles[0].roleName == 'ROLE_HOST'){
        this.disableReserveButton = true;
        
      }else{
        this.disableReserveButton = false;
      }
    })
    
  }

  checkoutPage() {
    this.router.navigate(['/checkout/property',this.propertyId]);
    // this.router.navigate(['/checkout'], { state: { property: this.activeProperty } });
    // this.router.navigate(['/checkout', this.activeProperty.id]);
  }

  notify() {
    this.toastr.success('Standalone works', 'Success');
  }
}
