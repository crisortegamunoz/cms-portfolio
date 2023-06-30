import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CertificateDTO } from '@core/models/website/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/certificates`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<CertificateDTO[]> {
    return this.httpClient.get<CertificateDTO[]>(`${this.SERVICE}`);
  }

  save(certificate: CertificateDTO): Observable<CertificateDTO> {
    if (certificate.id) {
      return this.httpClient.put<CertificateDTO>(`${this.SERVICE}`, certificate);
    } else {
      return this.httpClient.post<CertificateDTO>(`${this.SERVICE}`, certificate);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }

}
