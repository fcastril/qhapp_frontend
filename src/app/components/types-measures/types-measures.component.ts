import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TypeMeasureModel } from '../../models/type-measure.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types-measures',
  templateUrl: './types-measures.component.html',
  styleUrls: ['./types-measures.component.scss']
})
export class TypesMeasuresComponent implements OnInit {

  regs: TypeMeasureModel[] = [];
  searchText: '';
  title= 'Tipos de Medidas';
  constructor( private api: ApiService, private route: Router) { }

  ngOnInit(): void {
  }

  Submit(Form: NgForm)
  {
  }

  search(){
    this.api.getSearch('typesmeasures', this.searchText).subscribe(
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
      this.route.navigate(['type-measure','0']);
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
        this.api.delete('typesmeasures', id).subscribe(
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
