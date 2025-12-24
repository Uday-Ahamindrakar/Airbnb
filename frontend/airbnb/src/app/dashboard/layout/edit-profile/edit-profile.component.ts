import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddPropertyComponent } from '../../../host-dashboard/add-property/add-property.component';
import { HostService } from '../../../services/host.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CreatePropertyPayload } from '../../../model/create-property-payload';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../../../model/user';
import { UserPayload } from '../../../model/user-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  user!: User;

  initialValues: any;

  form = this.fb.group({
    name: ['', [Validators.minLength(4)]],
    email: [
      '',
      [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)],
    ],
    phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    password: [
      '',
      [
        Validators.pattern(
          /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPropertyComponent>,
    private hostService: HostService,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.activeUser$.subscribe((data) => {
      if (data) {
        this.user = data;
        this.form.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });

        this.initialValues = { ...this.form.value };
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<UserPayload> = {};

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control?.dirty) {
        const value = control.value;
        if (value !== null && value !== '') {
          payload[key as keyof UserPayload] = value;
        }
      }
    });

    if (Object.keys(payload).length === 0) {
      this.toaster.info('No changes detected');
      return;
    }

    this.userService
      .updateGuest(this.user.id, payload as UserPayload)
      .subscribe({
        next: () => {
          this.toaster.success(
            'Profile updated successfully please login again'
          );
          this.userService.getActiveUser().subscribe((d) => {
            this.userService.setActiveUser(d);
            
          });
          this.close();
          setTimeout(() => {
            this.userService.logout();
            this.router.navigateByUrl(''); // or '/'
          }, 300);
          /// Also update the local storage so that it will apply goblay and user should login with new email if he updates the email
        },
        error: () => {
          this.toaster.error('Something went wrong');
        },
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  hasAnyFieldChanged(): boolean {
    return Object.keys(this.form.value).some(
      (key) =>
        this.form.value[key as keyof typeof this.form.value] !==
        this.initialValues[key]
    );
  }
}
