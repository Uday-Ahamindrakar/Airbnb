import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPropertyComponent>
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

    const photos = this.photos.controls
      .map((c) => c.value)
      .filter((p): p is string => !!p?.trim());

    const payload = {
      ...this.form.getRawValue(),
      photos,
    };

    this.dialogRef.close(payload);
  }
  close() {
    this.dialogRef.close();
  }
}
