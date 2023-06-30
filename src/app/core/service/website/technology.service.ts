import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TechnologyDTO } from '../../models/website/technology.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/technology-data.json';
  private SERVICE = `/api/technologies`
  isTblLoading = true;
  dataChange: BehaviorSubject<TechnologyDTO[]> = new BehaviorSubject<TechnologyDTO[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TechnologyDTO;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): TechnologyDTO[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<TechnologyDTO[]>(this.API_URL)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getAll(): Observable<TechnologyDTO[]> {
    return this.httpClient.get<TechnologyDTO[]>(`${this.SERVICE}`);
  }

  save(technology: TechnologyDTO): Observable<TechnologyDTO> {
    if (technology.idTechnology) {
      return this.httpClient.put<TechnologyDTO>(`${this.SERVICE}`, technology);
    } else {
      return this.httpClient.post<TechnologyDTO>(`${this.SERVICE}`, technology);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }

}

