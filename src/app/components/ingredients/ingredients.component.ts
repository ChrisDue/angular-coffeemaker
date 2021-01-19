import { Component, OnInit } from '@angular/core';
import { IngredientsService } from './../../services/ingredients.service';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    // Get ingredients list from server / db
    this.ingredientsService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  onGet() {
    console.log('get all ingredients');
    this.ingredientsService.getIngredients().subscribe(x => console.log(x))
  }

  // onUse() {
  //   console.log('use something');
  //   this.ingredientsService.useIngredients(this.milk300, 200).subscribe(x => console.log(x))
  // }
}               