import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { PatientModel } from '../../models/patient.model';
import { ViewPatientsFull } from '../../models/v_PatientsFull.model';

import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  regs: ViewPatientsFull[] = [];
  searchText: '';
  title= 'Pacientes';
  currentPage: number = 1;
  records: number = 10;
  
  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {

    this.paginate();
  }

  Submit(Form: NgForm)
  {
  }
  paginate(){
    this.api.getPaginate('Patients', this.currentPage, this.records, this.searchText).subscribe(
      (resp: any) =>{
        this.regs = resp;
      }
    );
  }
  search(){
    this.currentPage = 1;
    this.paginate();

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
      this.route.navigate(['patient','0']);
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
        this.api.delete('patients', id).subscribe(
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

  back(){
    if (this.currentPage>0){
      this.currentPage --;
      this.paginate();
    }  
  }
  next(){
    this.currentPage++;
    this.paginate();
  }
}
