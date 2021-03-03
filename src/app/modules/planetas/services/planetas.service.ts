import { Planeta } from '../models/planeta';
import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetasService {

  url = environment.urlServer + 'planetas';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  get$(planeta: Planeta) {
    return this.http.get<any>(this.url + "/" + planeta.id, this.httpOptions)
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

  update$(planeta: Planeta) {
    return this.http.put<any>(this.url + "/" + planeta.id, planeta, this.httpOptions)
      .pipe(map(resp => resp))
      .pipe(map(resp => resp === null ? [] : resp));
  }

  create$(planeta: Planeta) {
    return this.http.post<any>(this.url, planeta, this.httpOptions)
      .pipe(map(resp => resp))
      .pipe(map(resp => resp === null ? [] : resp));
  }

}
