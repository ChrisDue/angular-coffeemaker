import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['../../app.component.css', '../recipes/recipes.component.css']
})
export class AddRecipeComponent implements OnInit {
  // any because not formatted as our module with id, etc.
  // @Output() addRecipe: EventEmitter<any> = new EventEmitter();


  name!: string;
  coffeeAmount!: number;
  waterAmount!: number;
  milkAmount!: number;
  cocoaAmount!: number;
  isFavorite!: boolean;

  constructor(private service: IngredientsService) { }

  ngOnInit(): void { }

  log(x: any) { console.log(x); }

  onAddSubmit() {
    const enteredRecipe: Recipe = {
      name: this.name ? this.name : "Recipe without a Name",
      coffeeAmount: this.coffeeAmount ? this.coffeeAmount : 0,
      waterAmount: this.waterAmount ? this.waterAmount : 0,
      milkAmount: this.milkAmount ? this.milkAmount : 0,
      cocoaAmount: this.cocoaAmount ? this.cocoaAmount : 0,
      isFavorite: false
    };
    console.log(enteredRecipe);
    this.service.addRecipe(enteredRecipe);
    location.reload();
  }
}
