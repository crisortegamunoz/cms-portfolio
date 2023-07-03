import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../../models/website/category.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/categories`

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<CategoryDTO[]> {
    return this.httpClient.get<CategoryDTO[]>(`${this.SERVICE}`);
  }

  save(category: CategoryDTO): Observable<CategoryDTO> {
    if (category.id) {
      return this.httpClient.put<CategoryDTO>(`${this.SERVICE}`, category);
    } else {
      return this.httpClient.post<CategoryDTO>(`${this.SERVICE}`, category);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }

  getBySection(section: string): Observable<CategoryDTO[]> {
    return this.httpClient.get<CategoryDTO[]>(`${this.SERVICE}/section/${section}`);
  }


}
