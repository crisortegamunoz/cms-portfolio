import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { PortfolioDTO } from '@core/models/website/portfolio.model';
import { PortfolioService } from '@core/service/website/portfolio.service';
import { SwalConfig } from '@core/swal/config';


@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})
export class PortfolioTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;

  portfolios: PortfolioDTO[];
  dataSource!: MatTableDataSource<PortfolioDTO>;
  displayedColumns: string[] = ['id', 'name', 'image', 'entityName', 'completed', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<PortfolioDTO>(true, []);
  exampleDatabase?: PortfolioService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public portfolioService: PortfolioService,
              private router: Router) {
    super();
    this.portfolios = [];
  }


  ngOnInit() {
    this.getPortfolios();
  }

  refresh() {
    this.getPortfolios();
  }

  getPortfolios() {
    this.portfolioService.getAll().subscribe((portfolios) => {
      this.portfolios = portfolios;
      this.dataSource = new MatTableDataSource<PortfolioDTO>(this.portfolios);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew() {
    this.router.navigate(['portfolio/form']);
  }

  editCall(portfolio: PortfolioDTO) {
    this.router.navigate(['portfolio/form', portfolio.id]);
  }

  deleteItem(portfolio: PortfolioDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
        this.portfolioService.delete(portfolio.id).subscribe(() => {
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
  onContextMenu(event: MouseEvent, item: PortfolioDTO) {
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
