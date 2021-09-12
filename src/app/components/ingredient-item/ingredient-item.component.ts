import { Component, OnInit, Input } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';
import { Ingredient } from 'src/app/models/Ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['../../app.component.css', './ingredient-item.component.css']
})

export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient = new Ingredient;

  refillAmountValue!: number;

  constructor(private service: MachineService) { }

  ngOnInit() { }

  log(x: any) { console.log(x); }

  onRefillSubmit() {
    // console.log("Updated ingredient: " + this.ingredient.name + " with " + this.ingredient.amount);
    this.service.refillIngredient(this.ingredient, this.refillAmountValue);
  }
}
