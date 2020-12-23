import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../Shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>()
    private recipes: Recipe[]=[
        new Recipe('Pan Cakes','Recipe of Pan Cakes','https://www.eggs.ca/assets/RecipePhotos/Fluffy-Pancakes-New-CMS.jpg',[new Ingredient('Flour Bag',1),new Ingredient('Syrup Bottles',1),new Ingredient('Berry Packs',1)]),
        new Recipe('CheeseCake','Recipe of Cheesecake','https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F7b084eaf9d7d564dd2667094c3dd1260a5e4d646',[new Ingredient('Milk',1),new Ingredient('Cheese',2),new Ingredient('SugarPack',2)])
      ]

    getRecipes(){
        return this.recipes.slice()
    }

}