import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class AppService {
    constructor(private httpClient: HttpClient) {

    }
    //login service
    login(loginData) {
        return this.httpClient.post("/login", loginData);
    }
    //get all users list
    getUsersList() {
        return this.httpClient.get("/users");
    }

}