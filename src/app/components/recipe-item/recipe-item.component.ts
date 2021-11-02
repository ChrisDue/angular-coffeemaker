import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['../../app.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = new Recipe;

  constructor(private service: MachineService) { }

  ngOnInit(): void { }

  onBrewSubmit(): void {
    this.service.brewRecipe(this.recipe);
  }
}
