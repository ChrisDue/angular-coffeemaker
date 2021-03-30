import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient, Id } from '../models/Ingredient';
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

const NONE_STRING: string = "None";
const INVALID_STRING: string = "Invalid";

@Injectable({
    providedIn: 'root'
})

export class IngredientsService {
    ingredientsUrl: string = 'http://localhost:3000/ingredients';
    recipesUrl: string = 'http://localhost:3000/recipes';
    ingredientsList!: Ingredient[];

    constructor(private http: HttpClient) {
        this.updateIngredientsList();
    }

    /* R E C I P E S */
    // Get all existing recipes 
    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.recipesUrl);
    }

    async addRecipe(enteredRecipe: Recipe): Promise<void> {
        console.log("Adding recipe: " + enteredRecipe);

        await this.http.post<Recipe>(this.recipesUrl, enteredRecipe, httpOptions)
            .subscribe();
        ///// DON'T Add name-check
        ///// DON'T Add editor
        // TODO Add delete-button
    }

    // Consume all ingredients associated to the selected recipe
    async brewRecipe(recipe: Recipe): Promise<void> {
        console.log("> Updating Ingredients.");
        this.updateIngredientsList();
        console.log(this.ingredientsList);

        // TODO getAll -> check ifEnough -> filter and apply changes to stream
        console.log("> > Can I brew " + recipe.name + " ?");
        let missingIngredient: String = NONE_STRING;
        missingIngredient = this.enoughIngredientsAvailable(recipe);
        if (missingIngredient == INVALID_STRING) {
            console.log("Invalid ingredient! Don't know " + missingIngredient);
            alert("Invalid ingredient! Don't know " + missingIngredient);
            return;
        } else if (missingIngredient != NONE_STRING) {
            console.log("Not enough ingredients! Need more " + missingIngredient);
            alert("Not enough ingredients! Need more " + missingIngredient);
            return;
        }
        console.log("Enough ingredients.");

        console.log("> > > Brewing now: " + recipe.name);
        this.useNeededIngredients(recipe);
        console.log("< < < Done brewing " + recipe.name)
    }

    async useNeededIngredients(recipe: Recipe): Promise<void> {
        let oldCoffee: Ingredient = await this.getIngredientById(Id.coffee);
        this.useIngredient(oldCoffee, recipe.coffeeAmount);
        let oldWater: Ingredient = await this.getIngredientById(Id.water);
        this.useIngredient(oldWater, recipe.waterAmount);
        let oldMilk: Ingredient = await this.getIngredientById(Id.milk);
        this.useIngredient(oldMilk, recipe.milkAmount);
        let oldCocoa: Ingredient = await this.getIngredientById(Id.cocoa);
        this.useIngredient(oldCocoa, recipe.cocoaAmount);
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



    enoughIngredientsAvailable(recipe: Recipe): string {
        let result: string = NONE_STRING;
        // let ingredients: Ingredient[] = Promise.all(this.getIngredients);
        this.ingredientsList.forEach((ingredient: Ingredient) => {
            switch (ingredient.name) {
                case "Coffee":
                    console.log(ingredient.amount + " " + ingredient.name + " given.");
                    console.log(recipe.coffeeAmount + " " + ingredient.name + " needed.");
                    if (ingredient.amount < recipe.coffeeAmount) {
                        result = ingredient.name;
                    }
                    break;
                case "Water":
                    console.log(ingredient.amount + " " + ingredient.name + " given.");
                    console.log(recipe.waterAmount + " " + ingredient.name + " needed.");
                    if (ingredient.amount < recipe.waterAmount) {
                        result = ingredient.name;
                    }
                    break;
                case "Milk":
                    console.log(ingredient.amount + " " + ingredient.name + " given.");
                    console.log(recipe.milkAmount + " " + ingredient.name + " needed.");
                    if (ingredient.amount < recipe.milkAmount) {
                        result = ingredient.name;
                    }
                    break;
                case "Cocoa":
                    console.log(ingredient.amount + " " + ingredient.name + " given.");
                    console.log(recipe.cocoaAmount + " " + ingredient.name + " needed.");
                    if (ingredient.amount < recipe.cocoaAmount) {
                        result = ingredient.name;
                    }
                    break;
                default:
                    result = INVALID_STRING;
                    console.log("Invalid Ingredient!");
                    break;
            };
        });
        return result;
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.ingredientsUrl);
    }

    updateIngredientsList(): void {
        this.getIngredients().subscribe(res => {
            this.ingredientsList = res;
        });
    }
}