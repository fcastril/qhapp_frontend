import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientConsentModel } from 'src/app/models/patient-consents.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consentsmedical',
  templateUrl: './consentsmedical.component.html',
  styleUrls: ['./consentsmedical.component.scss']
})
export class ConsentsmedicalComponent implements OnInit {

  title: string = 'Consentimientos informados';
  searchText: string = '';
  regs: PatientConsentModel[] = [];
  idParent: string;

  constructor(private api: ApiService,
    private route: Router) {
      this.idParent = localStorage.getItem('idParent');
     }

  ngOnInit(): void {
    this.search();
  }
  register(id: number){
    if (id===0){ // Registro Nuevo
      this.route.navigate(['medical-history',this.idParent,'others', 'consent-medical','0']);
    }
  }

  search(){
    this.api.getSearch('PatientConsents', this.searchText).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }

  keyupSearch(e: any){
    if (e.keyCode === 13)
    {
      this.search();
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
        this.api.delete('PatientConsents', id).subscribe(
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

  lookup(id: number){
    this.route.navigate(['medical-history',this.idParent,'others', 'consent-medical',id]);
  }
  Submit(f: NgForm){

  }
}
