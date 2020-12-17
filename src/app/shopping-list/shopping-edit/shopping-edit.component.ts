import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {Ingredient} from '../../Shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef
  @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef
  @Output() newIngredientAdded=new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit(): void {
  }

  OnAddClicked(){
    const newIng=new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value)
    this.newIngredientAdded.emit(newIng)
  }
}
