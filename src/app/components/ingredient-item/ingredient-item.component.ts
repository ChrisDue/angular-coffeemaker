import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;

  refillAmount!: number;

  constructor(private service: IngredientsService) { }

  ngOnInit() {
  }

  onRefillSubmit() {
    this.ingredient.amount += this.refillAmount;
    console.log("Updated ingredient: " + this.ingredient.name + " with " + this.ingredient.amount);
    this.service.updateIngredient(this.ingredient);
  }
}
