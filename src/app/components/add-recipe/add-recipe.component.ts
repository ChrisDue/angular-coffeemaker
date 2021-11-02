import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['../../app.component.css']
})

export class AddRecipeComponent implements OnInit {
  @Output() addRecipe: EventEmitter<any> = new EventEmitter();

  nameValue!: string;
  coffeeAmountValue!: number;
  waterAmountValue!: number;
  milkAmountValue!: number;
  cocoaAmountValue!: number;
  sugarAmountValue!: number;

  constructor(private service: MachineService) { }

  ngOnInit(): void { }

  onAddSubmit() {
    const enteredRecipe: Recipe = {
      name: this.nameValue ? this.nameValue : "No-Name",
      coffeeAmount: this.coffeeAmountValue ? this.coffeeAmountValue : 0,
      waterAmount: this.waterAmountValue ? this.waterAmountValue : 0,
      milkAmount: this.milkAmountValue ? this.milkAmountValue : 0,
      cocoaAmount: this.cocoaAmountValue ? this.cocoaAmountValue : 0,
      sugarAmount: this.sugarAmountValue ? this.sugarAmountValue : 0
    };
    this.service.addRecipe(enteredRecipe);
    location.reload();
  }
}
