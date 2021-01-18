import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../models/Recipe'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  recipesUrl: string = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

}
