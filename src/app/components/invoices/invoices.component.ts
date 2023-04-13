import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationRequestModel } from 'src/app/models/pagination.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewMovementsModel } from '../../models/v_Movements.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  regs: ViewMovementsModel[] = [];
  search: string;
  icon = 'compass';
  title = 'Facturas';
  currentPage = 0;
  records=10;


  constructor( private api: ApiService,
    public dialog: MatDialog,
    private route: Router) { }

  ngOnInit(): void {
    this.buscar();
  }

  Submit(Form: NgForm)
  {
    this.search = '';
  }

  buscar(){
    let paginationRequest = new PaginationRequestModel();
    paginationRequest.current = this.currentPage;
    paginationRequest.lenght = this.records;
    paginationRequest.search = this.search??'';


    this.api.getPagination(paginationRequest, 'Movements', '51').subscribe(
      (resp: any) => {
        this.regs = resp.data;
      }

    );
  }
  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.currentPage = 0;
      this.buscar();
    }
  }
  register(id: number){
    if(id=== 0)
    {
      this.route.navigate(['invoices','0']);
    }
  }
  delete(id: number, idx: number){
    Swal.fire(
      {
        title: 'Eliminar Registro',
        text: '¿Desea Eliminar el Registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed){
        this.api.delete('Movements', id).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
              Swal.fire('Error el Eliminar el Registro', 'se presentó un error al eliminar el registro', 'error');
            } else {
              this.regs.splice(idx,1);
              Swal.fire('Registro Eliminado', '', 'success');
            }
          }
        );
      }
    });
  }
  back(){
    if (this.currentPage>0){
      this.currentPage --;
      this.buscar();
    }
  }
  next(){
    this.currentPage++;
    this.buscar();
  }
  animal: string;
  openView(id: number){

    let config: MatDialogConfig = {
      panelClass : 'dialog-responsive',
      data: id,
      id: 'invoiceDialog'
    }

    let dialogRef = this.dialog.open(InvoiceViewComponent,
      config
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
