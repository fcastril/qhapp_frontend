import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TreatmentHeaderModel } from '../../../models/treatment-header.model';
import { TreatmentDetailLaserModel } from '../../../models/treatment-detail-laser.model';

@Component({
  selector: 'app-treatmentlaser',
  templateUrl: './treatmentlaser.component.html',
  styleUrls: ['./treatmentlaser.component.scss']
})
export class TreatmentlaserComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'Registrar Controles';
  controller= 'TreatmentsDetailsLaser';
  subtitle: string;
  titleHarmony = 'Control Harmony';
  titlePatientReview = 'Revisión del Paciente';

  reg = new TreatmentDetailLaserModel();
  regHeader = new TreatmentHeaderModel();
  regs: TreatmentDetailLaserModel[] = [];

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
  }

  regresar(){
      this.router.navigate(['medical-history',this.idParent,'treatments']);
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
        this.reg.idUserLogin = Number(localStorage.getItem('idUserLogin'));

        if (this.reg.idTreatmentDetailLaser === 0){
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
          this.api.put(this.controller,this.reg, this.reg.idTreatmentDetailLaser).subscribe(
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
