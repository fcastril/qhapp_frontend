import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AppointmentRecordModel } from '../../models/appointmentrecord.model';

@Component({
  selector: 'app-appointment-records',
  templateUrl: './appointment-records.component.html',
  styleUrls: ['./appointment-records.component.scss']
})
export class AppointmentRecordsComponent implements OnInit {

  regs: AppointmentRecordModel[] = [];
  searchText: '';
  title= 'Registro de Citas';

  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {
  }

  Submit(Form: NgForm)
  {
  }

  search(){
    this.api.getSearch('AppointmentRecords', this.searchText).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }
  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.search();
    }
  }
  register(id: number){
    if (id===0){ // Registro Nuevo
      this.route.navigate(['appointment-record','0']);
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
      if (result.isConfirmed) {
        this.api.delete('AppointmentRecords', id).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
                Swal.fire('Error al Eliminar el Registro','Se presentó un error al eliminar el registro', 'error');
            } else {
             this.regs.splice(idx,1);
              Swal.fire('Registro Eliminado', '', 'success');

            }
          }
        );

      }
    });
  }

}
