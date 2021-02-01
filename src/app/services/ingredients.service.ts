import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient, Id, Name, Unit } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';

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

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  async brewRecipe(recipe: Recipe) {
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

  async getIngredientById(ingredientId: Id): Promise<Ingredient> {
    // console.log(">>>START GET: Getting ingredient with ID " + ingredientId);
    const url = `${this.ingredientsUrl}/${ingredientId}`;
    const ingredient: Ingredient = await this.http.get<Ingredient>(url).toPromise();
    // console.log(ingredient);
    // console.log(">>>END GET.");
    return ingredient;
  }

  // Consume ingredients from the machine
  useIngredient(ingredient: Ingredient, usedAmount: number): void {
    const ingUrl = `${this.ingredientsUrl}/${ingredient.id}`;
    // console.log("> Got " + ingredient.name + " at " + ingredient.amount + " using " + usedAmount);
    ingredient.amount -= usedAmount;
    // console.log("< Sending update for " + ingredient.amount + " " + ingredient.name);
    this.http.patch(ingUrl, ingredient, httpOptions).subscribe(res => {
    });
  }

  // Put a given amount of one ingredient back into the machine
  refillIngredient(ingredient: Ingredient, refillAmount: number): void {
    let ingUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    ingredient.amount += refillAmount;
    this.http.patch(ingUrl, ingredient).subscribe(res => {
    });
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}