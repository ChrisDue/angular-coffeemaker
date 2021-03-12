import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient, Id, Name, Unit } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';

// @Error(exception = ResourceNotFoundException.class, global = true)
//     public HttpResponse<JsonError> resourceNotFoundHandler(ResourceNotFoundException exception) {
//         return HttpResponse.notFound(new JsonError(exception.getMessage()));
//     }

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class IngredientsService {
  ingredientsUrl: string = 'http://localhost:3000/ingredients';
  recipesUrl: string = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  /* R E C I P E S */
  // Get all existing recipes 
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  async addRecipe(enteredRecipe: Recipe) {
    console.log("Adding recipe: " + enteredRecipe);

    await this.http.post<Recipe>(this.recipesUrl, enteredRecipe, httpOptions)
      .subscribe();
    // TODO? Add name-check?
    // TODO? Add editor?
    // TODO Add delete-button
  }

  // Consume all ingredients associated to the selected recipe
  async brewRecipe(recipe: Recipe) {
    // TODO! Pre-Check
    // Error Handler horchen lassen auf Error Types
    // NotEnoughIngredientsException thrown lassen
    // Feld einfärben statt ausführen/abschicken
    // Auch für invalid values
    console.log("> > > Brewing now: " + recipe.name);

    let oldCoffee: Ingredient = await this.getIngredientById(Id.coffee);
    this.useIngredient(oldCoffee, recipe.coffeeAmount);

    let oldWater: Ingredient = await this.getIngredientById(Id.water);
    this.useIngredient(oldWater, recipe.waterAmount);

    let oldMilk: Ingredient = await this.getIngredientById(Id.milk);
    this.useIngredient(oldMilk, recipe.milkAmount);

    let oldCocoa: Ingredient = await this.getIngredientById(Id.cocoa);
    this.useIngredient(oldCocoa, recipe.cocoaAmount);

    console.log("< < < Done brewing " + recipe.name)
  }

  /* I N G R E D I E N T S */
  // Get one ingredient specified by the ID received 
  async getIngredientById(ingredientId: Id): Promise<Ingredient> {
    const url = `${this.ingredientsUrl}/${ingredientId}`;
    const ingredient: Ingredient = await this.http.get<Ingredient>(url).toPromise();
    return ingredient;
  }

  // Consume ingredients from the machine
  useIngredient(ingredient: Ingredient, usedAmount: number): void {
    let ingUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    let amountJson = {
      "amount": ingredient.amount -= usedAmount
    }
    this.http.patch(ingUrl, amountJson, httpOptions)
      .subscribe();
  }

  // Add a given amount of one ingredient back into the machine
  refillIngredient(ingredient: Ingredient, refillAmount: number): void {
    let ingUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    let amountJson = {
      "amount": ingredient.amount += refillAmount
    }
    this.http.patch(ingUrl, amountJson, httpOptions)
      .subscribe();
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}