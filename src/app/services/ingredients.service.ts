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

  brewRecipe(recipe: Recipe) {
    console.log("Brewing now: " + recipe.name);
    let newCoffee: Ingredient = {
      id: Id.coffee,
      name: Name.coffee,
      amount: recipe.coffeeAmount,
      unit: Unit.g
    };
    this.useIngredient(newCoffee, recipe.coffeeAmount);
  }

  /* I N G R E D I E N T S */

  // Consume ingredients from the machine
  useIngredient(ingredient: Ingredient, usedAmount: number) {
    let url = `${this.ingredientsUrl}/${ingredient.id}`;
    console.log("got " + ingredient.name + " at " + ingredient.amount + " using " + usedAmount);
    ingredient.amount -= usedAmount;
    this.http.put(url, ingredient, httpOptions);
  }

  updateIngredient(ingredient: Ingredient) {
    let tempUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    return this.http.patch(tempUrl, ingredient).subscribe(res => {
      // console.log("Response: " + res);
    });
  }

  getIngredientById(ingredientId: Id): Ingredient {
    let url = `${this.ingredientsUrl}/${ingredientId}`;
    let ingredient: Ingredient = new Ingredient;
    this.http.get<Ingredient>(url).subscribe(ing => {
      console.log(ing);
      ingredient.amount = ing.amount;
      ingredient.id = ing.id;
      ingredient.name = ing.name;
      ingredient.unit = ing.unit;
    });
    return ingredient;
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}