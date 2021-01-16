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
  @Output() deleteIngredient: EventEmitter<Ingredient> = new EventEmitter();

  refillAmount!: number;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
  }

  onSubmit() {
    // const todo = {
    //   title: this.title,
    //   completed: false
    // }
  }

  setClasses() {
    let classes = {
      todo: true
      // 'is-complete': this.ingredient.completed // only add this class, if...
    }
    return classes;
  }

}
