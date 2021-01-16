import { Component, OnInit } from '@angular/core';
import { Ingredient, Unit } from 'src/app/models/Ingredient';
import { IngredientsService } from './../../services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit() {
    // Get ingredients list from server / db
    this.ingredientsService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  milk300: Ingredient = { id: 3, name: "Milk", unit: Unit.ml, amount: 300 };

  onGet() {
    console.log('get something');
    this.ingredientsService.getIngredients().subscribe(x => console.log(x))
  }

  onAdd() {
    console.log('add something');
    this.ingredientsService.addIngredients(this.milk300, 150).subscribe(x => console.log(x))
  }

  onUse() {
    console.log('use something');
    this.ingredientsService.useIngredients(this.milk300, 200).subscribe(x => console.log(x))
  }

  // TODO
}