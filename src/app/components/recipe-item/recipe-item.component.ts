import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['../../app.component.css', '../recipes/recipes.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = new Recipe;

  constructor(private service: MachineService) { }

  ngOnInit(): void { }

  onBrewSubmit(): void {
    // console.log('Use ingredients for ' + this.recipe.name);
    this.service.brewRecipe(this.recipe);
  }
}
