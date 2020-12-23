import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../Shared/ingredient.model";

@Injectable({providedIn:'root'})

export class ShoppingListService{
    ingredientsChanged=new EventEmitter<Ingredient[]>()
    private ingredients:Ingredient[]=[
        new Ingredient('Cheese Bars',2),
        new Ingredient('Sugar',5)
      ]

    getIngredients(){
        return this.ingredients.slice()
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}