import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipesAndShoppingList';
  loadedComponent='recipe'
  OnNavigate(selected:string){
    this.loadedComponent=selected
  }
}
