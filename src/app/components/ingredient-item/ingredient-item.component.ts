import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;
  // @Output() refillEmitter: EventEmitter<Ingredient> = new EventEmitter();

  refillAmount!: number;

  constructor(private service: IngredientsService) { }

  ngOnInit() {
  }

  onRefillSubmit() {
    this.ingredient.amount += this.refillAmount;
    console.log(this.ingredient);
    // this.refillEmitter.emit(this.ingredient);
    // TODO this.service.updateIngredient();
  }
}
