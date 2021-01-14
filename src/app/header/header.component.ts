import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { DataStorageService } from '../Shared/data-storage.service'
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed
    isUserAuthenticated=false
    private userSubscription: Subscription
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {

    }
    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user=>{
            this.isUserAuthenticated=!user?false:true
            // this.isUserAuthenticated=!!user
        })
    }
    ngOnDestroy() {
        this.userSubscription.unsubscribe()
    }
    onSaveData() {
        this.dataStorageService.storeRecipes()
    }
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }
    onLogout(){
        this.authService.logout()
    }
}
