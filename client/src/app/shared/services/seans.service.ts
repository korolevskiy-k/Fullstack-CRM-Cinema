import { HttpClient } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, Seans } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class SeansService {
    constructor(private http: HttpClient) {

    }

    fetch(): Observable<Seans[]> {
        return this.http.get<Seans[]>('/api/seans')
    }    
}