import { HttpClient } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    constructor(private http: HttpClient) {

    }

    fetch(categoryId: string): Observable<Position[]> {
        return this.http.get<Position[]>(`/api/position/${categoryId}`)
    }

    create(position: Position): Observable<Position> {
        return this.http.post<Position>('/api/position', position)
    }

    update(position: Position): Observable<Position> {
        return this.http.patch<Position>(`/api/position/${position._id}`, position)
    }

    delete(position: Position): Observable<Message> {
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }
}