import { DateTime } from "luxon"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    async login(email: string, password: string): Promise<boolean> {
        const payload = {
            email,
            password,
        }

        const token = await this.httpClient.post('http://localhost:8080/login', payload).toPromise();

        const expiresAt = DateTime.local().plus({ minutes: +token['duration'] });

        localStorage.setItem('id_token', token['idToken']);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.toISO()));
        localStorage.setItem("is_admin", email == 'rakitin.dmit@gmail.com' ? 'true' : 'false');

        return true
    }

    async update(email: string, password: string, confirmPassword: string): Promise<boolean> {
        const payload = {
            email,
            password,
            confirmPassword,
        }

        const token = await this.httpClient.post('http://localhost:8080/private/whoami', '').toPromise();

        return true
    }

    async register(firstName: string, lastName: string, email: string, password: string): Promise<Object> {
        const payload = {
            firstName,
            lastName,
            email,
            password,
        }

        return await this.httpClient.post('http://localhost:8080/registration', payload).toPromise();
    }

    public isAuthenticated(): boolean {
        const expiration = this.getExpiration();

        const timeLeft = expiration.diffNow().as('milliseconds');

        return timeLeft > 0;
    }

    public isAdmin(): boolean {
        const isAdmin = localStorage.getItem("is_admin");

        // console.log('isAdmin', isAdmin);

        return isAdmin === 'true' && this.isAuthenticated();
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    isLoggedOut() {
        return !this.isAuthenticated();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");

        return DateTime.fromISO(JSON.parse(expiration));
    }
}
