import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['../../app.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private recipesService: RecipesService,
    private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
  }

}
