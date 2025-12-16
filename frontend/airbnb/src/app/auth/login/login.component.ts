import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email = '';
  // password = '';

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
    ],
  });

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService
  ) {}

  login() {
    console.log(this.email, this.password);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // this.userService.login(this.email.value!, this.password.value!).subscribe({
    //   next: (token: string) => {
    //     localStorage.setItem('access_token', token);

    //     this.userService.getActiveUser().subscribe({
    //       next: (user) => {
    //         console.log('Active User:', user);
    //         this.userService.setActiveUser(user);
    //         this.toastr.success('Login successful!');
    //         // this.router.navigate(['/checkout']);
    //         this.closeDialog();
    //       },
    //       error: (error) => {
    //         console.error('Error fetching active user:', error);
    //       },
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Login failed:', error);
    //     this.toastr.error('Login failed. Please check your credentials.');
    //   },
    // });
    this.userService.login(this.email.value!, this.password.value!).subscribe({
      next: (token) => {
        this.userService.setLoggedIn(token); 
        this.toastr.success('Login successful');
        this.userService.getActiveUser().subscribe((data)=>{
          // this.userService.setActiveUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          this.userService.setActiveUser(data); 

        })
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toastr.error('Login failed. Please check your credentials.');
      },
    });
  }
  notify() {
    this.toastr.success('Test');
  }

  signup() {
    this.router.navigate(['/signup']);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
