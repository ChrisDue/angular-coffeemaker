import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private machineService: MachineService) {
  }

  ngOnInit(): void {
    this.machineService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onGet() {
    console.log('get all recipes');
    this.machineService.getRecipes().subscribe(recipes => console.log(recipes));
  }
}
