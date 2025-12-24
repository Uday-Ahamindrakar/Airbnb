import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { LayoutService } from '../../services/layout.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { UserPayload } from '../../model/user-payload';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  // email = '';
  // password = '';

  user: UserPayload = {} as UserPayload;

  loginForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],

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

    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

    // provider: [null, Validators.required],
  });

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.layoutService.setHideMainMenu(true);
  }

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

    if (this.loginForm.value.name) {
      if (this.loginForm.value.email) {
        if (this.loginForm.value.password) {
          if (this.loginForm.value.phone) {
            this.user.name = this.loginForm.value.name;
            this.user.email = this.loginForm.value.email;
            this.user.password = this.loginForm.value.password;
            this.user.phone = this.loginForm.value.phone;

            if (this.user) {
              this.userService.addNewUser(this.user).subscribe({
                next: (res) => {
                  if (res == "Guest account successfully created :)") {
                    this.toastr.success(res);
                    this.router.navigate(['']);
                    this.openLogin();
                  }
                  if(res == "Account with the given email exists in the database :("){
                    this.toastr.warning("User already exist");
                    this.loginForm.reset();
                  }
                  
                 
                },
                error: (err) => {
                  this.toastr.error(err);
                },
              });
            }
          }
        }
      }
    }
    console.log('Login payload:', this.loginForm.value.name);
  }
  notify() {
    this.toastr.success('Test');
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
