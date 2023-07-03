import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ExperienceDTO } from '@core/models/website/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/experiences`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<ExperienceDTO[]> {
    return this.httpClient.get<ExperienceDTO[]>(`${this.SERVICE}`);
  }

  save(certificate: ExperienceDTO): Observable<ExperienceDTO> {
    if (certificate.id) {
      return this.httpClient.put<ExperienceDTO>(`${this.SERVICE}`, certificate);
    } else {
      return this.httpClient.post<ExperienceDTO>(`${this.SERVICE}`, certificate);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }
}
