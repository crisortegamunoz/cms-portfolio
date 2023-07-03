import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AboutDTO } from '@core/models/website/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/abouts`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<AboutDTO[]> {
    return this.httpClient.get<AboutDTO[]>(`${this.SERVICE}`);
  }

  save(certificate: AboutDTO): Observable<AboutDTO> {
    if (certificate.id) {
      return this.httpClient.put<AboutDTO>(`${this.SERVICE}`, certificate);
    } else {
      return this.httpClient.post<AboutDTO>(`${this.SERVICE}`, certificate);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }
}
