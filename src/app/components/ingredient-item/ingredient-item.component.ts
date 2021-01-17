import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/Ingredient';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css']
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;
  @Output() refillEmitter: EventEmitter<any> = new EventEmitter();

  refillAmount!: number;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
  }

  onRefillSubmit() {
    this.ingredient.amount += this.refillAmount;
    console.log(this.ingredient);
    // TODO emit ingredient + post it
  }

  setClasses() {
    let classes = {
      todo: true
      // 'is-complete': this.ingredient.completed // only add this class, if...
    }
    return classes;
  }

}
