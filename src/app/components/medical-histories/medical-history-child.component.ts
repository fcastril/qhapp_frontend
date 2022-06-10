import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewPatientsFull } from '../../models/v_PatientsFull.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-medical-history-child',
  templateUrl: './medical-history-child.component.html',
  styleUrls: ['./medical-history-child.component.scss'],
  providers: [DatePipe]
})
export class MedicalHistoryChildComponent implements OnInit {

  id: string;
  title= 'Historia Clinica';
  subtitle: string;
  reg = new ViewPatientsFull();
  controller= 'Patients';

  titlePatientsData = 'Paciente';

  imagePath: any;

  listAppointements: any [] = [];
  nextAppointment: any;
  lastAppointment: any;
  dateRegistration: any;
  age: any;
  dateBirth: any;

  FECHA = new Date();

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private _sanitizer: DomSanitizer,
              private datePipe: DatePipe) {
                this.route.parent.params.subscribe(
                  parametros => {
                    this.id = parametros.id;
                    localStorage.setItem('idParent', this.id);
                  }
                );
              }

  ngOnInit(): void {
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new ViewPatientsFull();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getParameter(this.controller,'History',this.id).subscribe(
        (resp: ViewPatientsFull) => {
          this.reg = resp;
          if(this.reg.picturePatient !== ''){
            this.imagePath = this.reg.picturePatient
          }else{
            this.imagePath = './../../assets/drop-images.png'
          }
          this.dateRegistration = this.reg.dateTimeNew;
          this.dateBirth = (this.datePipe.transform(this.reg.dateBirth, 'dd-MMM-yyyy'));
          if(this.reg.dateBirth){
            const convertAge = new Date(this.reg.dateBirth);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
          }
          localStorage.setItem('gender', this.reg.gender);
        }
      );
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
  }

}
