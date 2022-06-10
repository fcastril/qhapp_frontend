import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentDetailModel } from 'src/app/models/treatment-detail.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TreatmentHeaderModel } from '../../models/treatment-header.model';

import { Select2Data, Select2Option, Select2,} from 'ng-select2-component';
import { Select2Model } from '../../models/select2.model';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'Registrar Nota de Evolución';
  controller= 'TreatmentsDetails';
  subtitle: string;
  titleVitalSigns = 'Signos Vitales';
  titlePatientReview = 'Revisión del Paciente';

  reg = new TreatmentDetailModel();
  regHeader = new TreatmentHeaderModel();
  regs: TreatmentDetailModel[] = [];

  // datapru = new Select2Model();
  // listDiagnostics: Select2Option [] = [];
  // listTypesMeasures: Select2Option [] = [];

  // Necesarios para notas
  // data = new Select2Model();
  // listAddNotes: Select2Option [] = [];
  // valueNotes = '';
  listNotes: any [] = [];
  listAddNotes: any [] = [];
  listDiagnostics: any [] = [];
  listTypesMeasures: any [] = [];

  

  // datos de ejemplo para llenar el select 2
  // data: Select2Data = [
  //   {
  //       value: 'heliotrope', 
  //       label: 'Heliotrope', 
  //       data: { color: 'white', name: 'Heliotrope' }
  //   },
  //   {
  //       value: 'hibiscus', 
  //       label: 'Hibiscus', 
  //       data: { color: 'red', name: 'Hibiscus' }
  //   }
  // ]

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
                this.route.parent.params.subscribe(
                  parametros => {
                    this.idParent = parametros.id;
                  }
                );
              }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.api.getSearch( this.controller, this.id).subscribe(
    //   (resp: any)=>{
    //     this.regs = resp;
    //   }
    // );

    // se carga la lista del select para Notas
    this.api.get('AddNotes').subscribe(
      (resp: any) =>{
        this.listNotes = resp;
        this.listAddNotes = resp;
        this.listAddNotes.unshift({
          idAddNote: 0,
          nameNote: 'Seleccione una opción'
        });
      }
    );

    // se carga la lista del select para Diagnosticos
    this.api.get('Diagnostics').subscribe(
      (resp: any) =>{
        this.listDiagnostics = resp;
        this.listDiagnostics.unshift({
          idDiagnostic: 0,
          diagnostic: 'Seleccione una opción'
        });
      }
    );

    // se carga la lista del select para Typo de Control Medidas
    this.api.get('TypesMeasures').subscribe(
      (resp: any) =>{
        this.listTypesMeasures = resp;
        this.listTypesMeasures.unshift({
          idTypeMeasure: 0,
          typeMeasure: 'Seleccione una opción'
        });
      }
    );


  }

  regresar(){
      this.router.navigate(['medical-history',this.idParent,'treatments']);
  }

  public selectList(event: any) {
    const ID = Number(event.target.value);

    let message = '';
    this.listNotes.forEach(element => {
      if(element.idAddNote === ID){
        message = element.descriptionNote;
      }
    });

    this.reg.diagnosticComments += message;
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
        this.reg.idTreatmentHeader = Number(this.id);
        this.reg.idDiagnostic = Number(this.reg.idDiagnostic);
        this.reg.idTypeMeasure = Number(this.reg.idTypeMeasure);
        this.reg.idUserLogin = Number(localStorage.getItem('idUserLogin'));

        if (this.reg.idTreatmentDetail === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.searchHeader();
              // this.router.navigate(['medical-history',this.idParent,'treatments']);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idTreatmentDetail).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'treatments']);
            }
          });
        }
      }
    });
  }

  searchHeader() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.api.getId('TreatmentsHeaders', this.id).subscribe(
      (resp: any) =>{
        this.regHeader = resp;
        this.regHeader.numberSessionsAttended ++;
        this.regHeader.dateLastAttention = new Date();
        this.uploadHeader();
      }
    );
  }

  uploadHeader() {
    this.api.put('TreatmentsHeaders',this.regHeader, this.regHeader.idTreatmentHeader).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        this.router.navigate(['medical-history',this.idParent,'treatments']);
      }
    });
  }

}
