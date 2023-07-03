import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar} from '@angular/material/snack-bar';

import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { AboutDTO } from '@core/models/website/about.model';
import { AboutService } from '@core/service/website/about.service';
import { SwalConfig } from '@core/swal/config';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-about-table',
  templateUrl: './about-table.component.html',
  styleUrls: ['./about-table.component.scss']
})
export class AboutTableComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  abouts: AboutDTO[];
  dataSource!: MatTableDataSource<AboutDTO>;
  displayedColumns: string[] = ['id', 'name', 'image', 'entityName', 'completed', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<AboutDTO>(true, []);
  exampleDatabase?: AboutService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public aboutService: AboutService,
              private snackBar: MatSnackBar) {
    super();
    this.abouts = [];
  }


  ngOnInit() {
    this.getPortfolios();
  }

  refresh() {
    this.getPortfolios();
  }

  getPortfolios() {
    this.aboutService.getAll().subscribe((abouts) => {
      this.abouts = abouts;
      this.dataSource = new MatTableDataSource<AboutDTO>(this.abouts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew() {
    return;
  }

  editCall(about: AboutDTO) {
    return;
  }

  deleteItem(about: AboutDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.aboutService.delete(about.id).subscribe(() => {
            SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'El portafolio fue eliminado');
            this.getPortfolios();
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
  onContextMenu(event: MouseEvent, item: AboutDTO) {
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
