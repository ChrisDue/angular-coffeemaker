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
  @Output() addRecipe: EventEmitter<any> = new EventEmitter();

  nameValue!: string;
  coffeeAmountValue!: number;
  waterAmountValue!: number;
  milkAmountValue!: number;
  cocoaAmountValue!: number;
  isFavorite!: boolean;

  constructor(private service: IngredientsService) { }

  ngOnInit(): void { }

  log(x: any) { console.log(x); }

  onAddSubmit() {
    const enteredRecipe: Recipe = {
      name: this.nameValue ? this.nameValue : "No Name",
      coffeeAmount: this.coffeeAmountValue ? this.coffeeAmountValue : 0,
      waterAmount: this.waterAmountValue ? this.waterAmountValue : 0,
      milkAmount: this.milkAmountValue ? this.milkAmountValue : 0,
      cocoaAmount: this.cocoaAmountValue ? this.cocoaAmountValue : 0,
      isFavorite: false
    };
    console.log(enteredRecipe);
    this.service.addRecipe(enteredRecipe);
    location.reload();
  }
}
