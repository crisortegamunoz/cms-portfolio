import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar} from '@angular/material/snack-bar';


import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { ExperienceDTO } from '@core/models/website/experience.model';
import { ExperienceService } from '@core/service/website/experience.service';
import { SwalConfig } from '@core/swal/config';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-experience-table',
  templateUrl: './experience-table.component.html',
  styleUrls: ['./experience-table.component.scss']
})
export class ExperienceTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  experiences: ExperienceDTO[];
  dataSource!: MatTableDataSource<ExperienceDTO>;
  displayedColumns: string[] = ['id', 'name', 'image', 'entityName', 'completed', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<ExperienceDTO>(true, []);
  exampleDatabase?: ExperienceService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public experienceService: ExperienceService,
              private snackBar: MatSnackBar) {
    super();
    this.experiences = [];
  }


  ngOnInit() {
    this.getSkills();
  }

  refresh() {
    this.getSkills();
  }

  getSkills() {
    this.experienceService.getAll().subscribe((experiences) => {
      this.experiences = experiences;
      this.dataSource = new MatTableDataSource<ExperienceDTO>(this.experiences);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew() {
    return;
  }

  editCall(experience: ExperienceDTO) {
    return;
  }

  deleteItem(experience: ExperienceDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.experienceService.delete(experience.id).subscribe(() => {
            SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'La experiencia fue eliminada');
            this.getSkills();
        });

      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    /*const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<TechnologyDTO>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );*/
  }

  // context menu
  onContextMenu(event: MouseEvent, item: ExperienceDTO) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
      if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
        this.contextMenu.menuData = { item: item };
        this.contextMenu.menu.focusFirstItem('mouse');
        this.contextMenu.openMenu();
      }
  }

}
