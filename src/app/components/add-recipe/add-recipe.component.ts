import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['../../app.component.css', '../recipes/recipes.component.css']
})
export class AddRecipeComponent implements OnInit {
  // any because not formatted as our module with id, etc.
  @Output() addRecipe: EventEmitter<any> = new EventEmitter();

  name!: string;
  coffeeAmount!: number;
  waterAmount!: number;
  milkAmount!: number;
  cocoaAmount!: number;
  isFavorite!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const enteredRecipe: Recipe = {
      name: this.name,
      coffeeAmount: this.coffeeAmount,
      waterAmount: this.waterAmount,
      milkAmount: this.milkAmount,
      cocoaAmount: this.cocoaAmount,
      isFavorite: false
    };
    console.log(enteredRecipe);
    // Todo: this.addRecipe.emit(enteredRecipe);
  }
}
