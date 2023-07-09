import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TechnologyDTO } from '../../models/website/technology.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `http://localhost:8080/api/technologies`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  requestOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic dXNlcjowODQxZWQwOC1mYmJlLTRhNDctYjliYy03N2NhODIxZTIyYjE='
    })
  }


  getAll(): Observable<TechnologyDTO[]> {
    return this.httpClient.get<TechnologyDTO[]>(`${this.SERVICE}`, this.requestOptions);
  }

  save(technology: TechnologyDTO): Observable<TechnologyDTO> {
    if (technology.id) {
      return this.httpClient.put<TechnologyDTO>(`${this.SERVICE}`, technology);
    } else {
      return this.httpClient.post<TechnologyDTO>(`${this.SERVICE}`, technology);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }

}

