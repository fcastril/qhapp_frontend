import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { InsuranceCompanyModel } from '../../models/insurance-company.model';

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',
  styleUrls: ['./insurance-company.component.scss']
})
export class InsuranceCompanyComponent implements OnInit {

  // base
  id: string;
  title= 'Aseguradora';
  controller= 'InsuranceCompanies';
  navigateToPage='/insurance-companies';
  subtitle: string;
  reg = new InsuranceCompanyModel();

  // propios para el desarrollo
  titleInsuranceData = 'Datos de la Aseguradora';
  titleBillingData = 'Datos de Facturación';
  listTypeDocuments: any [] = [];
  listTypeTaxpayers: any [] = [];
  listCities: any [] = [];
  listTypePayments: any [] = [];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new InsuranceCompanyModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: InsuranceCompanyModel) => this.reg = resp
      );
    }

    // se carga la lista del select para Tipo Documento
    this.api.get('TypesDocuments').subscribe(
      (resp: any) =>{
        this.listTypeDocuments = resp;
        this.listTypeDocuments.unshift({
          idTypeDocument: 0,
          typeDocument: 'Seleccione el Tipo de Documento.'
        });
      }
    );

    // se carga la lista del select para Tipo Contribuyente
    this.api.get('TypesTaxpayers').subscribe(
      (resp: any) =>{
        this.listTypeTaxpayers = resp;
        this.listTypeTaxpayers.unshift({
          idTypeTaxpayer: 0,
          typeTaxpayer: 'Seleccione el Tipo de Contribuyente.'
        });
      }
    );

    // se carga la lista del select para Ciudades
    this.api.get('Cities').subscribe(
      (resp: any) =>{
        this.listCities = resp;
        this.listCities.unshift({
          idCity: 0,
          nameCity: 'Seleccione la Ciudad.'
        });
      }
    );

    // se carga la lista del select para Tipos de Pagos
    this.api.get('TypesPayments').subscribe(
      (resp: any) =>{
        this.listTypePayments = resp;
        this.listTypePayments.unshift({
          idTypePayment: 0,
          descriptionTypePayment: 'Seleccione la Condición de Pago.'
        });
      }
    );


  }

  // Se genera el dato de Digito de Verificación para los tipos de documentos que lo necesiten
  public DVGenerator(event: any) {

    const nroDocumento = this.reg.documentInsuranceCompany;
    let digito = 0;
    let sumatoria = 0;
    const primos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    const limite = nroDocumento.length - 1;

    for (let i = 0; i < limite + 1; i++) {
        sumatoria += primos[i] * Number(nroDocumento[limite - i]);
    }

    digito = sumatoria % 11;
    if (digito > 1)
        digito = 11 - digito;

    this.reg.dvinsuranceCompany = String(digito);
    
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
        if (this.reg.idInsuranceCompany === 0){
          this.reg.idCity = Number(this.reg.idCity);
          this.reg.idCityBilling = Number(this.reg.idCityBilling);
          this.reg.idTypeDocument = Number(this.reg.idTypeDocument);
          this.reg.idTypePayment = Number(this.reg.idTypePayment);
          this.reg.idTypeTaxpayer = Number(this.reg.idTypeTaxpayer);
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idInsuranceCompany).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        }
      }
    });

  }

}
