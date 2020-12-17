import { Component, EventEmitter, Output } from '@angular/core'
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    collapsed = true;
    @Output() selectedComponent=new EventEmitter<string>()
    OnSelect(selected:string){
        this.selectedComponent.emit(selected)
    }
}
