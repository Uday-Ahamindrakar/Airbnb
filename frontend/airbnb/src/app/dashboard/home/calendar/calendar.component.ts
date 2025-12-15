// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Property } from '../../../model/listing';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  styleUrl: './calendar.component.css'
})
export class CalendarComponent  implements OnInit {
  property! : Property
  constructor(private fb: FormBuilder, private userService : UserService) {}

  form = this.fb.group({
    start: [null, Validators.required],
    end: [null, Validators.required],
  });

  ngOnInit(): void {
    // Watch changes (best for debugging)
    this.form.valueChanges.subscribe(({ start, end }) => {
      console.log('Start:', start);
      console.log('End:', end);
    });

    this.userService.properties$.subscribe({
      next: (property) => {
        this.property = property!;
      }
    });
  }

  // getters (clean + reusable)
  get start() {
    return this.form.get('start');
  }

  get end() {
    return this.form.get('end');
  }
  
}
