import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AppointmentRecordModel } from '../../models/appointmentrecord.model';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientModel } from 'src/app/models/patient.model';

@Component({
  selector: 'app-appointment-record',
  templateUrl: './appointment-record.component.html',
  styleUrls: ['./appointment-record.component.scss']
})
export class AppointmentRecordComponent implements OnInit {

  id: string;
  date: string;
  idTypeAgenda: number;
  title= 'Registro de Citas';
  controller= 'AppointmentRecords';
  navigateToPage='/appointment-records';
  subtitle: string;
  reg = new AppointmentRecordModel();

  listReasonAppointment: any [] = [];
  listUsers: any [] = [];
  listPatients: any [] = [];
  listStatusAppointments: any [] = [];
  listTypesAgenda: any [] = [];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.date = this.route.snapshot.paramMap.get('date');
    this.idTypeAgenda = +this.route.snapshot.paramMap.get('typeAgenda');

    this.loadForm();

  }
  async loadForm(){


    await this.loadReasonsAppointmets();
    await this.users();
    await this.patients();
    await this.statusAppointments();
    await this.typesAgenda();





    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new AppointmentRecordModel();
      this.reg.idTypeAgenda = this.idTypeAgenda;
      this.reg.dateTimeInitial = new Date(this.date);
      this.reg.dateTimeInitial_ = this.datePipe.transform(this.date, 'yyyy-MM-ddThh:mm');
      this.reg.dateTimeFinal = new Date(this.date);
      this.reg.dateTimeInitial_ = this.datePipe.transform(this.date, 'yyyy-MM-ddThh:mm');
      let dateFinalSelected = (new Date(this.date)).getMinutes()+15;
      this.reg.dateTimeFinal.setMinutes(dateFinalSelected);
      this.reg.dateTimeFinal_ = this.datePipe.transform(this.reg.dateTimeFinal, 'yyyy-MM-ddThh:mm');

    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: AppointmentRecordModel) => {
          this.reg = resp;
          this.reg.dateTimeInitial_ = this.datePipe.transform(this.reg.dateTimeInitial, 'yyyy-MM-ddThh:mm');
          this.reg.dateTimeFinal_ = this.datePipe.transform(this.reg.dateTimeFinal, 'yyyy-MM-ddThh:mm');
        }

      );
    }
  }

  async loadReasonsAppointmets(){

    // se carga la lista del select para Motivo Cita
    this.api.get('ReasonsAppointments').subscribe(
      (resp: any) =>{
        this.listReasonAppointment = resp;
        this.listReasonAppointment.unshift({
          idReasonAppointment: 0,
          reasonAppointment: 'Seleccione el Motivo de la Cita.'
        });
      }
    );
  }
  async users(){
        // se carga la lista del select para Usuarios que estan habilitados para atender pacientes
        this.api.getParameter('Users','atencion', '1').subscribe(
          (resp: any) =>{
            this.listUsers = resp;
            this.listUsers.unshift({
              idUser: 0,
              firstNameUser: 'Seleccione el profesional.'
            });
          }
        );
  }
  async patients(){
        // se carga la lista del select para Pacientes
        this.api.get('Patients').subscribe(
          (resp: any) =>{
            this.listPatients = resp;
            this.listPatients.unshift({
              idPatient: 0,
              fullName: 'Seleccione el Paciente.'
            });
          }
        );
  }
async statusAppointments(){
   // se carga la lista del select para Estado de Cita
   this.api.get('StatusAppointments').subscribe(
    (resp: any) =>{
      this.listStatusAppointments = resp;
      this.listStatusAppointments.unshift({
        idStatusAppointment: 0,
        statusAppointment1: 'Seleccione el Estado de la Cita.'
      });
    }
  );
}
async typesAgenda(){

    // se carga la lista del select para Tipos de Agendas
    this.api.get('TypesAgenda').subscribe(
      (resp: any) =>{
        this.listTypesAgenda = resp;
        this.listTypesAgenda.unshift({
          idTypeAgenda: 0,
          typeAgenda: 'Seleccione el Tipo de Agenda.'
        });
      }
    );
}
  click()
  {
    let dateTime = new Date();
    this.reg.dateTimeInitial_ = dateTime.toISOString().substring(0, 16);
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

        this.reg.idPatient = Number(this.reg.idPatient);
        this.reg.idReasonAppointment = Number(this.reg.idReasonAppointment);
        this.reg.idStatusAppointment = Number(this.reg.idStatusAppointment);
        this.reg.idTypeAgenda = Number(this.reg.idTypeAgenda);
        this.reg.idUser = Number(this.reg.idUser);



        this.reg.dateTimeInitial = new Date(this.reg.dateTimeInitial_);

        let dateInitialSelected = this.reg.dateTimeInitial.getMinutes()-(5*60);
        this.reg.dateTimeInitial.setMinutes(dateInitialSelected);

        this.reg.dateTimeFinal = new Date(this.reg.dateTimeFinal_);
        let dateFinalSelected = this.reg.dateTimeFinal.getMinutes()-(5*60);
        this.reg.dateTimeFinal.setMinutes(dateFinalSelected);

        if (this.reg.idAppointmentRecord === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idAppointmentRecord).subscribe(
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

  onBlurPatient(){
    this.reg.fullName = 'Buscando ...';
    this.api.getId('Patients/documentpatient', this.reg.documentPatient).subscribe(
      (resp: PatientModel) => {
        this.reg.idPatient = resp.idPatient;
        this.reg.fullName = resp.fullName;
      },
      (error: HttpErrorResponse) => {

        if (error.status == 404) // NOt fount
        {
          Swal.fire({
            icon: 'error',
            title: 'No se encontro el Tercero',
            text: `Documento Digitado: ${this.reg.documentPatient}`}
          );
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'No se encontro el Tercero',
            text: `Mensaje de Error: ${error.message}`}
          );
        }
        this.reg.fullName = '';
      }
    );
  }

}
