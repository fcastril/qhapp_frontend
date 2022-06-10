import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { StatusAppointmentModel } from 'src/app/models/status-appointments.model';

@Component({
  selector: 'app-status-appointment',
  templateUrl: './status-appointment.component.html',
  styleUrls: ['./status-appointment.component.scss']
})
export class StatusAppointmentComponent implements OnInit {

  id: string;
  title= 'Estado de Citas';
  controller= 'StatusAppointments';
  navigateToPage='/status-appointments';
  subtitle: string;
  reg = new StatusAppointmentModel();
  color: any;
  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new StatusAppointmentModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: StatusAppointmentModel) => this.reg = resp
      );
      this.color = this.reg.colorStatusAppointment;
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
        this.reg.colorStatusAppointment = this.color;
        if (this.reg.idStatusAppointment === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idStatusAppointment).subscribe(
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
