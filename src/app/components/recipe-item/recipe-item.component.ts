import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['../../app.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = new Recipe;

  constructor(private service: IngredientsService) { }

  ngOnInit(): void {
  }

  onBrewSubmit() {
    console.log('Use ingredients of clicked recipe ' + this.recipe.name);
    this.service.brewRecipe(this.recipe);
  }
}