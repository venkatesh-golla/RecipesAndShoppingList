import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../Shared/ingredient.model'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[]=[
    new Ingredient('Cheese Bars',2),
    new Ingredient('Sugar',5)
  ]
  constructor() { }

  ngOnInit(): void {
  }

  OnIngredientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient)
  }

}
