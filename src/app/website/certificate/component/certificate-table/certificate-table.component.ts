import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar} from '@angular/material/snack-bar';


import { UnsubscribeOnDestroyAdapter, } from '@shared';
import { CertificateDTO } from '@core/models/website/certificate.model';
import { CertificateService } from '@core/service/website/certificate.service';
import { SwalConfig } from '@core/swal/config';
import { MatTableDataSource } from '@angular/material/table';
import { CertificateFormComponent } from '../certificate-form/certificate-form.component';
import { CommonFunctions } from '@core/util/common';

@Component({
  selector: 'app-certificate-table',
  templateUrl: './certificate-table.component.html',
  styleUrls: ['./certificate-table.component.scss']
})
export class CertificateTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  private PATH = 'images/certificate';
  certificates: CertificateDTO[];
  dataSource!: MatTableDataSource<CertificateDTO>;
  displayedColumns: string[] = ['id', 'name', 'image', 'entityName', 'completed', 'actions'];
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<CertificateDTO>(true, []);
  exampleDatabase?: CertificateService;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public certificateService: CertificateService,
              private snackBar: MatSnackBar) {
    super();
    this.certificates = [];
  }


  ngOnInit() {
    this.getCertificates();
  }

  refresh() {
    this.getCertificates();
  }

  getCertificates() {
    this.certificateService.getAll().subscribe((page) => {
      this.certificates = page.content;
      this.dataSource = new MatTableDataSource<CertificateDTO>(this.certificates);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(CertificateFormComponent, {
      data: {
        object: {} as CertificateDTO,
        action: 'add',
        disableClose: true
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage('El certificado fue creado exitosamente!');
        this.getCertificates();
      }
    });
  }

  editCall(certificate: CertificateDTO) {
    const dialogRef = this.dialog.open(CertificateFormComponent, {
      data: {
        object: certificate,
        action: 'edit',
        disableClose: true
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        SwalConfig.successMessage(`El certificado N° ${certificate.id} fue actualizado`);
        this.getCertificates();
      }
    });
  }

  deleteItem(certificate: CertificateDTO) {
    SwalConfig.deleteMessage().then((result) => {
      if (result.isConfirmed) {
       const files: string[] = CommonFunctions.createFilePaths(this.PATH, CommonFunctions.getFilePathByUrl([certificate.imgUrl, certificate.pdfUrl]));
       CommonFunctions.deleteFilesFromFirebase(files)
        .then(() => {
          this.certificateService.delete(certificate.id).subscribe(() => {
              SwalConfig.simpleModalSuccess('Operación realizada con exito!', 'El certificado fue eliminado');
              this.getCertificates();
          });
        })
        .catch(error => {
          SwalConfig.simpleModalError('Error', 'Hubo un error al intentar eliminar los archivos desde Firebase');
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
  onContextMenu(event: MouseEvent, item: CertificateDTO) {
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

