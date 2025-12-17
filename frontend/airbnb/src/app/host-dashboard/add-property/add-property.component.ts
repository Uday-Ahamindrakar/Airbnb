import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HostService } from '../../services/host.service';
import { Property } from '../../model/listing';
import { UserService } from '../../services/user.service';
import { CreatePropertyPayload } from '../../model/create-property-payload';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    price_per_night: [null, [Validators.required, Validators.min(1)]],
    max_guest: [null, [Validators.required, Validators.min(1)]],
    status: ['ACTIVE', Validators.required],
    photos: this.fb.array(
      Array.from({ length: 7 }).map(() =>
        this.fb.control('', Validators.required)
      )
    ),
  });

  addproperty!: CreatePropertyPayload;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPropertyComponent>,
    private hostService: HostService,
    private userService : UserService,
    private toaster : ToastrService
  ) {}

  get photos(): FormArray {
    return this.form.get('photos') as FormArray;
  }

  hasMinimumPhotos(): boolean {
    const filled = this.photos.controls.filter((c) => c.value?.trim()).length;
    return filled >= 3;
  }

  submit() {
  if (this.form.invalid || !this.hasMinimumPhotos()) {
    this.form.markAllAsTouched();
    return;
  }

  // map photos to backend-compatible structure
  const photos = this.photos.controls
    .map(c => c.value?.trim())
    .filter(Boolean)
    .map(url => ({ url }));

  // STRICT payload — matches CreatePropertyPayload
  const payload: CreatePropertyPayload = {
    title: this.form.value.title!,
    description: this.form.value.description!,
    city: this.form.value.city!,
    address: this.form.value.address!,
    country: this.form.value.country!,
    price_per_night: this.form.value.price_per_night!,
    max_guest: this.form.value.max_guest!,
    photos
  };

  // get user ONCE and call API
  this.userService.activeUser$
    .pipe(take(1))
    .subscribe(user => {
      if (!user) {
        console.error('User not logged in');
        return;
      }

      this.hostService.addProperty(payload, user.email)
        .subscribe({
          next: (message) => {
            this.toaster.success(message);
            this.dialogRef.close(true); // success
          },
          error: err => {
            console.error('Add property failed', err);
          }
        });
    });
}

  close() {
    this.dialogRef.close();
  }
}
