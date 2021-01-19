import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onGet() {
    console.log('get all recipes');
    this.recipesService.getRecipes().subscribe(x => console.log(x))
  }
}
