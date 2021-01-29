import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    this.ingredientsService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onGet() {
    console.log('get all recipes');
    this.ingredientsService.getRecipes().subscribe(x => console.log(x))
  }
}
