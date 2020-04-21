import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, AdminAuthResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

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
             tap(this.setToken)
         )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
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
