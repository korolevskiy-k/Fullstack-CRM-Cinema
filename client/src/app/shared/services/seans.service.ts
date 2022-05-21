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
    getById(id: string): Observable<Seans[]> {
        return this.http.get<Seans[]>(`/api/seans/${id}`)
    }
    create(name: string): Observable<Seans> {
        const fd = new FormData()        
        fd.append('name', name)
        return this.http.post<Seans>('/api/seans', fd)
    } 
    update(id: string, name: string): Observable<Seans> {
        const fd = new FormData()        
        fd.append('name', name)
        return this.http.patch<Seans>(`/api/seans/${id}`, fd)
    }

    delete(id: string): Observable<Message> {
        return this.http.delete<Message>(`/api/seans/${id}`)
    }
}