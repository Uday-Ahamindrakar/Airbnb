import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Property } from '../../../model/listing';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {

  @Input() property!: Property; 
  @Output() selectProperty: EventEmitter<Property> = new EventEmitter<Property>();   

  constructor() {
    
  }
  ngOnInit(): void {
  }

  onCardClick() {
    this.selectProperty.emit(this.property);
  }
}
