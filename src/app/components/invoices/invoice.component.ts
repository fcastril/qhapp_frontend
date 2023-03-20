import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientModel } from 'src/app/models/patient.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { MovementModel } from '../../models/movements.model';
import { MovementsDetailModel } from '../../models/movementsDetail.model';
import { TypeMovementModel } from '../../models/type-movement.model';
import { ViewMovementsDetailsModel } from '../../models/v_MovementsDetail.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements OnInit {

  id: string;
  icon = 'compass';
  title = 'Facturas';
  titleDetail = 'Detalles'
  subtitle: string;
  reg = new MovementModel();
  regTypeMovement = new TypeMovementModel();
  regDetail = new MovementsDetailModel();
  regsDetail: ViewMovementsDetailsModel [] = [];
  TypesMovements: any[] = [];
  Providers: any [] = [];
  Products: any[] = [];
  Warehouses: any[] = [];
  TypesPayments: any[] = [];
  Sellers: any[] = [];
  Customers: any[] = [];
  UENs: any[] = [];
  TypeListPrices: any[] = [];
  idxSeleccionado: number;
  multiplier: number;
  patients: Observable<any[]>;
  isDetailVisible = false;

  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

    ngOnInit(): void {
      // List types movements
      this.api.getId('TypesMovements/GetOption', '51').subscribe(
        (resp: any) =>{
          this.TypesMovements = resp;
          this.TypesMovements.unshift({
            idTypeMovement: 0,
            descriptionTypeMovement: 'Seleccione el tipo de movimiento'
          });
        }
      );
      // List types Payments
      this.api.get('TypesPayments').subscribe(
        (resp: any) =>{
          this.TypesPayments = resp;
          this.TypesPayments.unshift({
            idTypePayment: 0,
            descriptionTypePayment: 'Seleccione el Tipo de Pago'
          });
        }
      );
      // List Seller -- Vendedor
      this.api.get('Users').subscribe(
        (resp: any) =>{
          this.Sellers = resp;
          this.Sellers.unshift({
            idUser: 0,
            firstNameUser: 'Seleccione el Vendedor',
            lastFirstNameUser: ''
          });
        }
      );

      // List Products
      this.api.get('Products').subscribe(
        (resp: any) =>{
          this.Products = resp;
          this.Products.unshift({
            idProduct: 0,
            descriptionProduct: 'Seleccione el producto'
          });

        }
      );
      // List UENs
      this.api.get('UENs').subscribe(
        (resp: any) =>{
          this.UENs = resp;
          this.UENs.unshift({
            idUen: 0,
            uen1: 'Seleccione el UEN'
          });
        }
      );
      // List Warehouses
      this.api.get('Warehouses').subscribe(
        (resp: any) =>{
          this.Warehouses = resp;
          this.Warehouses.unshift({
            idWarehouse: 0,
            descriptionWarehouse: 'Seleccione la Bodega'
          });
        }
      );
      // List to Prices List
      this.api.get('TypesPriceLists').subscribe(
        (resp: any) =>{
          this.TypeListPrices = resp;
          this.TypeListPrices.unshift({
            idTypePriceList: 0,
            typePriceList: 'Seleccione la lista de precios'
          });
        }
      );
      // Validate create or edit
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id === '0') {
        this.subtitle = 'CREANDO';
        this.reg = new MovementModel();
        this.isDetailVisible = false;
      } else {
        this.subtitle = 'EDITANDO';
        this.isDetailVisible = true;
        this.api.getId('Movements',this.id).subscribe(
          (resp: MovementModel) => {
            this.reg = resp;
            this.api.getId('Patients', this.reg.idCustomer.toString()).subscribe(
              (res: PatientModel) => {
                this.reg.docCustomer = res.documentPatient;
                this.reg.nameCustomer = res.fullName;
              }
            );
            this.LoadMultiplier(this.reg.idTypeMovement);
          }
        );
        this.buscar();
      }
    }

    Submit( form: NgForm){
      if (form.invalid) {
        Object.values(form.controls).forEach( ctrl => {
          ctrl.markAsTouched();
        });
        Swal.fire(
          {
            title: 'Error',
            text: 'Hacen falta campos obligatorios',
            icon: 'error'
          }
        );
        return;
      }
      Swal.fire(
        {
          title: 'Confirmar Guardar !!!',
          text: '¿Está seguro de guardar el registro actual?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Guardar'
        }
      ).then((result)=> {
        if (result.isConfirmed) {
          this.reg.idTypeMovement = Number(this.reg.idTypeMovement);
          this.reg.idUserUpdated = Number(localStorage.getItem('idUserLogin'));
          this.reg.idCustomer = Number(this.reg.idCustomer);
          this.reg.idTypePayment = Number(this.reg.idTypePayment);
          this.reg.idSeller = Number(this.reg.idSeller);
          this.reg.idTypePriceList = Number(this.reg.idTypePriceList);
          this.reg.dateTimeCanceled = new Date();
          this.reg.dateTimeUpdated = new Date();
          if(this.reg.canceled){
            this.reg.idUserCanceled = Number(localStorage.getItem('idUserLogin'));
          }
          if (this.reg.idMovement === 0){
            this.reg.idUserNew = Number(localStorage.getItem('idUserLogin'));
            this.reg.dateTimeNew = new Date();
            this.api.post('Movements',this.reg).subscribe(
              (resp: any)=>{
              if (resp.error) {
                  Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
              } else {
                window.location.replace(`#/invoices/${resp.idMovement}`);
                window.location.reload();
              }
            });
          } else {
            this.api.put('Movements',this.reg, this.reg.idMovement).subscribe(
              (resp: any)=>{
              if (resp.error) {
                  Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
              } else {
                window.location.replace(`#/invoices/${resp.idMovement}`);
                window.location.reload();
              }
            });
          }
        }
      });
    }

    // load Consecutive after select
    public LoadConsecutive(event: any){
      const ID = event.target.value;

      if(ID){
        this.api.getId('TypesMovements', String(ID)).subscribe(
          (resp: TypeMovementModel) => {
            this.reg.consecutive = resp.consecutive + 1;
            this.reg.multiplier = resp.multiplier;
          }
        );
      }
    }

    // load multiplier
    public LoadMultiplier(idTypeMovement: number){
      this.api.getId('TypesMovements', String(idTypeMovement)).subscribe(
        (resp: TypeMovementModel) => {
          this.multiplier = resp.multiplier;
          this.reg.multiplier = this.multiplier;
        }
      );
    }

    // load warehouses
    public LoadWarehouse(idProject: string){
      // List Warehouses
      this.api.getSearch('ListPrices', idProject).subscribe(
        (resp: any) =>{
          this.Warehouses = resp;
          this.Warehouses.unshift({
            idWarehouse: 0,
            descriptionWarehouse: 'Seleccione la Bodega'
          });
        }
      );
    }
    // load Price
    public LoadPrice(event: any){
      const ID = event.target.value;
      this.regDetail.value = 0;

      if(ID){
        this.api.getCode('ListPrices/GetPrice', ID, this.reg.idTypePriceList).subscribe(
          (resp: any) =>{
            this.regDetail.value = resp.value;
          }
        );
      }
    }
    // Save Movement detail
    SubmitDetail( form: NgForm){
      if (form.invalid) {
        Object.values(form.controls).forEach( ctrl => {
          ctrl.markAsTouched();
        });
        Swal.fire(
          {
            title: 'Error',
            text: 'Hacen falta campos obligatorios',
            icon: 'error'
          }
        );
        return;
      }
      Swal.fire(
        {
          title: 'Confirmar Guardar !!!',
          text: '¿Está seguro de guardar el registro actual?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Guardar'
        }
      ).then((result)=> {
        if (result.isConfirmed) {
          this.regDetail.idMovement = Number(this.id);
          this.regDetail.idProduct = Number(this.regDetail.idProduct);
          this.regDetail.idWarehouse = Number(this.regDetail.idWarehouse);
          this.regDetail.idUen = Number(this.regDetail.idUen);
          if (this.regDetail.idMovementDetail === 0){
            this.api.post('MovementsDetails',this.regDetail).subscribe(
              (resp: any)=>{
              if (resp.error) {
                  Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
              } else {
                this.buscar();
              }
            });
          } else {
            this.api.put('MovementsDetails',this.regDetail, this.regDetail.idMovementDetail).subscribe(
              (resp: any)=>{
              if (resp.error) {
                  Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
              } else {
                this.buscar();
              }
            });
          }
          this.CleanDataDetail();
        }
      });
    }
    // search details
    buscar(){
      this.api.getSearch('MovementsDetails', this.id).subscribe(
        (resp: any) =>{
          this.regsDetail = resp;
        }
      );
    }

    // clean fields detail
    CleanDataDetail(){
      this.regDetail = new MovementsDetailModel();
    }

    // When clic button edit Branch Office
    LoadDataDetail(id: number, idx: number){
      this.idxSeleccionado = idx;
      this.api.getId('MovementsDetails', id.toString()).subscribe(
        (resp: any) =>
        {
            this.regDetail = resp;
        }
      )
    }

    // delete detail
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
          this.api.delete('MovementsDetails', id).subscribe(
            (resp:any) =>
            {
              if (resp.error) {
                Swal.fire('Error el Eliminar el Registro', 'se presentó un error al eliminar el registro', 'error');
              } else {
                this.regsDetail.splice(idx,1);
                Swal.fire('Registro Eliminado', '', 'success');
              }
            }
          );
        }
      });
    }

    onBlurCustomer()
    {
      this.reg.nameCustomer = 'Buscando ...';
      this.api.getId('Patients/documentpatient', this.reg.docCustomer).subscribe(
        (resp: PatientModel) => {
          this.reg.idCustomer = resp.idPatient;
          this.reg.nameCustomer = resp.fullName;
        },
        (error: HttpErrorResponse) => {

          if (error.status == 404) // NOt fount
          {
            Swal.fire({
              icon: 'error',
              title: 'No se encontro el Tercero',
              text: `Documento Digitado: ${this.reg.docCustomer}`}
            );
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'No se encontro el Tercero',
              text: `Mensaje de Error: ${error.message}`}
            );
          }
          this.reg.nameCustomer = '';
        }
      );
    }

}

