import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;
  @Output() refillEmitter: EventEmitter<any> = new EventEmitter();

  refillAmount!: number;

  constructor() { }

  ngOnInit() {
  }

  onRefillSubmit() {
    this.ingredient.amount += this.refillAmount;
    console.log(this.ingredient);
    this.refillEmitter.emit(this.ingredient);
  }
}
