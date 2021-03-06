import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()
/*     private recipes: Recipe[]=[
        new Recipe('Pan Cakes','Recipe of Pan Cakes','https://www.eggs.ca/assets/RecipePhotos/Fluffy-Pancakes-New-CMS.jpg',[new Ingredient('Flour Bags',1),new Ingredient('Syrup Bottles',1),new Ingredient('Berry Packs',1)]),
        new Recipe('CheeseCake','Recipe of Cheesecake','https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F7b084eaf9d7d564dd2667094c3dd1260a5e4d646',[new Ingredient('Milk',1),new Ingredient('Cheese Bars',2),new Ingredient('Sugar Packs',2)])
      ] */
      private recipes: Recipe[]=[]
    constructor(private shoppingListService:ShoppingListService){

    }

    getRecipes(){
        return this.recipes.slice()
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }

    getRecipe(id:number){
        return this.recipes[id]
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice())
    }

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice())
    }
}