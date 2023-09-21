import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnsubscribeOnDestroyAdapter, } from '@shared';

import { CategoryService } from '../../../../core/service/website/category.service';
import { CategoryDTO } from '../../../../core/models/website/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { SwalConfig } from '@core/swal/config';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class CategoryTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  categories: CategoryDTO[];
  dataSource!: MatTableDataSource<CategoryDTO>;
  displayedColumns: string[] = ['id', 'name', 'section', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<CategoryDTO>(true, []);
  exampleDatabase?: CategoryService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public categoryService: CategoryService,
              private snackBar: MatSnackBar) {
    super();
    this.categories = [];
  }


  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe((page) => {
      this.categories = page.content;
      this.dataSource = new MatTableDataSource<CategoryDTO>(this.categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  refresh() {
    this.getCategories();
  }

  addNew() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        object: {} as CategoryDTO,
        action: 'add',
        disableClose: true
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage('La categoría fue creada exitosamente!');
        this.getCategories();
      }
    });
  }

  editItem(category: CategoryDTO) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        object: category,
        action: 'edit',
        disableClose: true
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage(`La categoría N° ${category.id} fue actualizada`);
        this.getCategories();
      }
    });
  }

  deleteItem(category: CategoryDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(category.id).subscribe(() => {
            SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'La categoría fue eliminada');
            this.getCategories();
        });
      }
    });
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
  onContextMenu(event: MouseEvent, item: CategoryDTO) {
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
