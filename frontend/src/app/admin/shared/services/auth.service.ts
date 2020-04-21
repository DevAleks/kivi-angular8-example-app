import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    get token(): string {
        return ''
    }

    login(user: User):Observable<any> {
        return this.http.post(``, user)
         .pipe(
             tap(this.setToken)
         )
    }

    logout() {

    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private setToken(response) {
        console.log(response)
    }
}
