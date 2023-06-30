import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import { MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { SkillDTO } from '@core/models/website/skill.model';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { SkillService } from '@core/service/website/skill.service';
import { SwalConfig } from '@core/swal/config';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-skill-table',
  templateUrl: './skill-table.component.html',
  styleUrls: ['./skill-table.component.scss']
})
export class SkillTableComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  skills: SkillDTO[];
  dataSource!: MatTableDataSource<SkillDTO>;
  displayedColumns: string[] = ['id', 'name', 'show', 'technologyName', 'categoryName', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<SkillDTO>(true, []);
  exampleDatabase?: SkillService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public skillService: SkillService,
              private snackBar: MatSnackBar) {
    super();
    this.skills = [];
  }


  ngOnInit() {
    this.getSkills();
  }

  refresh() {
    this.getSkills();
  }

  getSkills() {
    this.skillService.getAll().subscribe((skills) => {
      this.skills = skills;
      this.dataSource = new MatTableDataSource<SkillDTO>(this.skills);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(SkillFormComponent, {
      data: {
        category: {} as SkillDTO,
        action: 'add',
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage('La habilidad fue creada exitosamente!');
        this.getSkills();
      }
    });
  }

  editCall(skill: SkillDTO) {
    const dialogRef = this.dialog.open(SkillFormComponent, {
      data: {
        object: skill,
        action: 'edit',
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage(`La habilidad N° ${skill.id} fue actualizada`);
        this.getSkills();
      }
    });
  }

  deleteItem(skill: SkillDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.skillService.delete(skill.id).subscribe(() => {
            SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'La habilidad fue eliminada');
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
  onContextMenu(event: MouseEvent, item: SkillDTO) {
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

