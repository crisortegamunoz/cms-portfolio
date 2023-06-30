import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { TechnologyService } from '@core/service/website/technology.service';
import { SwalConfig } from '@core/swal/config';
import { TechnologyFormComponent } from '../technology-form/technology-form.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  technologies: TechnologyDTO[];
  dataSource!: MatTableDataSource<TechnologyDTO>;
  displayedColumns: string[] = ['id', 'name', 'version', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<TechnologyDTO>(true, []);
  exampleDatabase?: TechnologyService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public technologyService: TechnologyService,
              private snackBar: MatSnackBar) {
    super();
    this.technologies = [];
  }


  ngOnInit() {
    this.getTechnologies();
  }

  getTechnologies() {
    this.technologyService.getAll().subscribe((technologies) => {
      this.technologies = technologies;
      this.dataSource = new MatTableDataSource<TechnologyDTO>(this.technologies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  refresh() {
    this.getTechnologies();
  }

  addNew() {
    const dialogRef = this.dialog.open(TechnologyFormComponent, {
      data: {
        object: {} as TechnologyDTO,
        action: 'add',
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage('La tecnología fue creada exitosamente!');
        this.getTechnologies();
      }
    });
  }

  editItem(technology: TechnologyDTO) {
    const dialogRef = this.dialog.open(TechnologyFormComponent, {
      data: {
        object: technology,
        action: 'edit',
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage(`La tecnología N° ${technology.idTechnology} fue actualizada`);
        this.getTechnologies();
      }
    });
  }

  deleteItem(technology: TechnologyDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.technologyService.delete(technology.idTechnology).subscribe(() => {
            SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'La tecnología fue eliminada');
            this.getTechnologies();
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
  onContextMenu(event: MouseEvent, item: TechnologyDTO) {
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
