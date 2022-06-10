import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TypeMovementModel } from '../../models/type-movement.model';

@Component({
  selector: 'app-types-movements',
  templateUrl: './types-movements.component.html',
  styleUrls: ['./types-movements.component.scss']
})
export class TypesMovementsComponent implements OnInit {

  regs: TypeMovementModel[] = [];
  searchText: '';
  title= 'Tipos de Movimientos';

  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {
  }

  Submit(Form: NgForm)
  {
  }

  search(){
    this.api.getSearch('TypesMovements', this.searchText).subscribe(
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
      this.route.navigate(['type-movement','0']);
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
        this.api.delete('TypesMovements', id).subscribe(
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
