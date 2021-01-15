import { Component, OnInit } from '@angular/core';
import { IngredientsService } from './../../services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
  }

  // TODO: onClick -> get ingredients
  onClick() {
    console.log('get something');
    this.ingredientsService.getIngredients().subscribe(x => console.log(x))
  }

}
