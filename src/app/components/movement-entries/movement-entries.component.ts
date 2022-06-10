import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewMovementsModel } from '../../models/v_Movements.model';

@Component({
  selector: 'app-movement-entries',
  templateUrl: './movement-entries.component.html',
  styleUrls: ['./movement-entries.component.scss']
})
export class MovementEntriesComponent implements OnInit {

  regs: ViewMovementsModel[] = [];
  search: string;
  icon = 'compass';
  title = 'Movimientos Inventarios';

  constructor( private api: ApiService, private route: Router) { }

  ngOnInit(): void {
  }

  Submit(Form: NgForm)
  {
    this.search = '';
  }

  buscar(){
    this.api.getMovement('Movements','43',this.search).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }
  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.buscar();
    }
  }
  register(id: number){
    if(id=== 0)
    {
      this.route.navigate(['movements-entry','0']);
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
      if (result.isConfirmed){
        this.api.delete('Movements', id).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
              Swal.fire('Error el Eliminar el Registro', 'se presentó un error al eliminar el registro', 'error');
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
