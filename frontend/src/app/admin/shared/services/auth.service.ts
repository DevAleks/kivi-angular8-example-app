import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, AdminAuthResponse } from '../interfaces';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) {}

    get token(): string {
        const expDate = new Date(localStorage.getItem('auth-token-exp'))
        if(new Date() > expDate) {
            this.logout()
            return null
        }
        return localStorage.getItem('auth-token')
    }

    login(user: User):Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`http://localhost/jwt/api/login.php`, user)
         .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
         )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private handleError(error: HttpErrorResponse) {
        const message = error.error.message

        console.log(message)

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break            
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email не существует')
                break
        }

        return throwError(error)
    }

    private setToken(response: AdminAuthResponse | null) {
        //console.log(response)
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('auth-token', response.jwt)
            localStorage.setItem('auth-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }

    }
}
