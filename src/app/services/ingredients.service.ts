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
  // Get all existing recipes 
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  // Consume all ingredients associated to the selected recipe
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
  // Get one ingredient specified by the ID received 
  async getIngredientById(ingredientId: Id): Promise<Ingredient> {
    const url = `${this.ingredientsUrl}/${ingredientId}`;
    const ingredient: Ingredient = await this.http.get<Ingredient>(url).toPromise();
    return ingredient;
  }

  // Consume ingredients from the machine
  useIngredient(ingredient: Ingredient, usedAmount: number): void {
    const ingUrl = `${this.ingredientsUrl}/${ingredient.id}`;
    ingredient.amount -= usedAmount;
    this.http.patch(ingUrl, ingredient, httpOptions).subscribe(res => {
    });
  }

  // Add a given amount of one ingredient back into the machine
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