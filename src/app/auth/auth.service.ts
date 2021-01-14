import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken:string
    email:string
    refreshToken:string
    expiresIn:string
    localId:string
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    user= new BehaviorSubject<User>(null)
    token:string=null
    private tokenExpirationTimer:any

    constructor(private http:HttpClient,private router:Router){}

    signUp(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey,
        {email:email,
        password:password,
        returnSecureToken:true}).pipe(catchError(this.handleError),tap(responseDate=>{
            this.handleAuthentication(responseDate.email,responseDate.idToken,responseDate.idToken,+responseDate.expiresIn)
        }))
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(responseDate=>{
            this.handleAuthentication(responseDate.email,responseDate.idToken,responseDate.idToken,+responseDate.expiresIn)
        }))
    }

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer=null
    }

    autoLogin(){
        const userData:{
            email:string
            id:string
            _token:string
            _tokenExpirationData:string
        }=JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationData))

        if(loadedUser.token){
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationData).getTime()-new Date().getTime()
            this.autoLogout(expirationDuration)
        }
    }

    autoLogout(expirationToken:number){
        this.tokenExpirationTimer= setTimeout(()=>{
            this.logout()
        },expirationToken)
    }

    private handleError(errorResponse:HttpErrorResponse){
        let errorMessage='An Unknown error occured'
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage)
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':errorMessage='This email already exists. Please switch to Login'
            case 'EMAIL_NOT_FOUND':errorMessage='This email is not registered Please switch to Sign Up'
        }
        return throwError(errorMessage)
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000)
        const user =new User(email,userId,token,expirationDate)
        this.user.next(user)
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData',JSON.stringify(user))
    }
}