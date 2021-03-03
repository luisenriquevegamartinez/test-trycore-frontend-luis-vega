import { Persona } from './../models/persona';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  url = environment.urlServer + 'personas';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  get$(persona: Persona) {
    return this.http.get<any>(this.url + "/" + persona.id, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }


  getAll$(page?: number) {
    const params = page ? new HttpParams().append('page', page.toString()) : this.httpOptions.params;
    return this.http.get<any>(this.url, { params, headers: this.httpOptions.headers })
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  search$(termino: object) {
    return this.http.post<any>(this.url + "Search", termino, this.httpOptions)
      .pipe(map(resp => resp.data))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  delete$(id: object) {
    return this.http.delete<any>(this.url + '/' + id, this.httpOptions)
      .pipe(map(resp => resp))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  update$(persona: Persona) {
    return this.http.put<any>(this.url + "/" + persona.id, persona, this.httpOptions)
      .pipe(map(resp => resp))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  create$(persona: Persona) {
    return this.http.post<any>(this.url, persona, this.httpOptions)
      .pipe(map(resp => resp))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  checkid$(persona) {
    return this.http.post<any>(this.url +"CheckId", persona, this.httpOptions)
    .pipe(map(resp => resp.data))
  }

}
