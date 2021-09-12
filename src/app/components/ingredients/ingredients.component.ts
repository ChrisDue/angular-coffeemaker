import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['../../app.component.css']
})

export class IngredientsComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private machineService: MachineService) {
  }

  ngOnInit(): void {
    // Get ingredients list from server / db
    this.machineService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  onGet() {
    console.log('get all ingredients');
    this.machineService.getIngredients().subscribe(x => console.log(x))
  }
}
