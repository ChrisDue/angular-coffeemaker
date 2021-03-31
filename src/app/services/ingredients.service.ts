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
        // console.log("> Updating Ingredients.");
        // this.updateIngredientsList();
        // console.log(this.ingredientsList);

        // TODO getAll -> check ifEnough -> filter and apply changes to stream
        console.log("> > Can I brew " + recipe.name + " ?");
        let missingIngredient: string = await this.enoughIngredientsAvailable(recipe);
        // if (missingIngredient == INVALID_STRING) {
        //     console.log("Invalid ingredient! Don't know " + missingIngredient);
        //     alert("Invalid ingredient! Don't know " + missingIngredient);
        // } else 
        if (missingIngredient != NONE_STRING) {
            console.log("Not enough ingredients! Need more " + missingIngredient);
            alert("Not enough ingredients! Need more " + missingIngredient);
        } else {
            this.useNeededIngredients(recipe);
            console.log("< < Done brewing " + recipe.name)
        }
    }

    /*  */
    async enoughIngredientsAvailable(recipe: Recipe): Promise<string> {
        let result: string = NONE_STRING;

        let currentCoffee: Ingredient = await this.getIngredientById(Id.coffee);
        if (currentCoffee.amount < recipe.coffeeAmount) return currentCoffee.name;
        let currentWater: Ingredient = await this.getIngredientById(Id.water);
        if (currentWater.amount < recipe.waterAmount) return currentWater.name;
        let currentMilk: Ingredient = await this.getIngredientById(Id.milk);
        if (currentMilk.amount < recipe.milkAmount) return currentMilk.name;
        let currentCocoa: Ingredient = await this.getIngredientById(Id.cocoa);
        if (currentCocoa.amount < recipe.cocoaAmount) return currentCocoa.name;

        return result;
    }

    /*  */
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

    /* getStringFromPromise(promise: Promise<string>): string {
            let dataString: string = "";
            promise.then((data) => { dataString = data; });
            return dataString;
        }
    
        getIngredientFromPromise(promise: Promise<Ingredient>): Ingredient {
            let dataString: Ingredient = new Ingredient();
            promise.then((data) => { dataString = data; });
            return dataString;
        } */

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

    updateIngredientsList(): void {
        this.getIngredients().subscribe(res => {
            this.ingredientsList = res;
        });
    }
}