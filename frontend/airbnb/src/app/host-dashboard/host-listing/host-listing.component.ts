import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostService } from '../../services/host.service';
import { UserService } from '../../services/user.service';
import { Property } from '../../model/listing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../dashboard/home/card/card.component';

@Component({
  selector: 'app-host-listing',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './host-listing.component.html',
  styleUrl: './host-listing.component.css',
})
export class HostListingComponent implements OnInit, OnDestroy {

  properties: Property[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private hostService: HostService,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.hostService.setSelectedHostMenu('myListing');

    combineLatest([
      this.userService.activeUser$.pipe(filter(Boolean)),
      this.hostService.getAllActiveProperties()
    ])
      .pipe(
        map(([host, properties]) =>
          properties.filter(p => p.hostId === host!.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: properties => {
          this.properties = properties;
        },
        error: () => {
          this.toaster.error('Failed to load properties');
        }
      });
  }

  onSelectProperty(property: Property): void {
    this.router.navigate(['/property', property.id]);
  }

  editProperty(property: Property): void {
    console.log('Edit property:', property);
  }

  deleteProperty(id: number): void {
    this.hostService.deleteProperty(id).subscribe({
      next: () => {
        this.toaster.success('Property deleted');
        this.hostService.refreshProperties(); // 🔥 sync trigger
      },
      error: () => {
        this.toaster.error('Failed to delete property');
      }
    });
  }

  trackById(index: number, item: Property): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}