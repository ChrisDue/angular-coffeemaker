import { Component, OnInit, Input } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css', './ingredient-item.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;

  refillAmount!: number;

  constructor(private service: IngredientsService) { }

  ngOnInit() { }

  log(x: any) { console.log(x); }

  onRefillSubmit() {
    // console.log("Updated ingredient: " + this.ingredient.name + " with " + this.ingredient.amount);
    this.service.refillIngredient(this.ingredient, this.refillAmount);
  }
}
