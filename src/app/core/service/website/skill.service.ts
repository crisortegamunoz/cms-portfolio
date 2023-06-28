import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkillDTO } from '../../models/website/skill.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'assets/data/skill-data.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<SkillDTO[]> = new BehaviorSubject<SkillDTO[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: SkillDTO;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): SkillDTO[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<SkillDTO[]>(this.API_URL)
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
  addAdvanceTable(advanceTable: SkillDTO): void {
    this.dialogData = advanceTable;

    // this.httpClient.post(this.API_URL, advanceTable)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = advanceTable;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateAdvanceTable(advanceTable: SkillDTO): void {
    this.dialogData = advanceTable;

    // this.httpClient.put(this.API_URL + advanceTable.id, advanceTable)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = advanceTable;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAdvanceTable(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }

}
