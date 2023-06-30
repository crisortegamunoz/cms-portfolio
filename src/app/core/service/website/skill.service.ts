import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillDTO } from '../../models/website/skill.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends UnsubscribeOnDestroyAdapter {

  private SERVICE = `/api/skills`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<SkillDTO[]> {
    return this.httpClient.get<SkillDTO[]>(`${this.SERVICE}`);
  }

  save(skill: SkillDTO): Observable<SkillDTO> {
    if (skill.id) {
      return this.httpClient.put<SkillDTO>(`${this.SERVICE}`, skill);
    } else {
      return this.httpClient.post<SkillDTO>(`${this.SERVICE}`, skill);
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.SERVICE}/${id}`);
  }

}
