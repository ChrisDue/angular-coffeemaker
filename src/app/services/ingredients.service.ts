import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient } from '../models/Ingredient';

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

  constructor(private http: HttpClient) { }

  updateIngredient(ingredient: Ingredient) {
    let tempUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    return this.http.patch(tempUrl, ingredient).subscribe(res => {
      // console.log("Response: " + res);
    });
  }

  // Use ingredients from the machine
  useIngredients(ingredient: Ingredient, addedAmount: number): Observable<any> {
    const url = `${this.ingredientsUrl}/${ingredient.id}`;
    console.log("got " + ingredient.name + " at " + ingredient.amount + " adding " + addedAmount);
    ingredient.amount -= addedAmount;
    return this.http.put(url, ingredient, httpOptions);
  }

  // List currently available ingredients
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.ingredientsUrl}`);
  }
}