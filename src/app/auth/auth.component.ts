import {Component} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthResponseData, AuthService } from './auth.service'

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent{
    isInLoginMode=true
    isLoading=false
    error:string=null
    constructor(private authService:AuthService,private router:Router){}
    onSwitchMode(){
        this.isInLoginMode=!this.isInLoginMode
    }

    onSubmit(authForm:NgForm){
        if(!authForm.valid){
            return
        }
        console.log(authForm.value)
        let authObservable:Observable<AuthResponseData>
        this.isLoading=true
        if(this.isInLoginMode){
            console.log('Login Mode')
            authObservable= this.authService.login(authForm.value.email,authForm.value.password)           
        }else{
            console.log('SignUp Mode')
            authObservable= this.authService.signUp(authForm.value.email,authForm.value.password)
        }

        authObservable.subscribe(responseData=>{
            console.log(responseData)      
            this.isLoading=false
            this.router.navigate(['/recipes'])          
        },errorMessage=>{
            console.log(errorMessage)
            this.isLoading=false
            this.error=errorMessage
        })
        this.isLoading=false
        authForm.resetForm()
    }
}