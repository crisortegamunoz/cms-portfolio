import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { PortfolioDTO } from '@core/models/website/portfolio.model';
import { Page } from '@core/models/response/page.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService  extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/portfolios`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<Page<PortfolioDTO>> {
    return this.httpClient.get<Page<PortfolioDTO>>(`${this.SERVICE}`);
  }

  save(certificate: PortfolioDTO): Observable<PortfolioDTO> {
    if (certificate.id) {
      return this.httpClient.put<PortfolioDTO>(`${this.SERVICE}`, certificate);
    } else {
      return this.httpClient.post<PortfolioDTO>(`${this.SERVICE}`, certificate);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }
}
