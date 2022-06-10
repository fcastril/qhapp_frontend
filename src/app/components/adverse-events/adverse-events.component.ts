import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AdverseEventModel } from 'src/app/models/adverse-event.model';
import { AnswerModel } from 'src/app/models/adverse-event.model';

@Component({
  selector: 'app-adverse-events',
  templateUrl: './adverse-events.component.html',
  styleUrls: ['./adverse-events.component.scss']
})
export class AdverseEventsComponent implements OnInit {

  idParent: string;
  regs: AdverseEventModel[] = [];
  searchText: '';
  title= 'Eventos Adversos';
  controller = 'AdverseEvent';

  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
                
              }

  ngOnInit(): void {
    this.idParent = localStorage.getItem('idParent');
    this.api.getSearch( this.controller, this.idParent).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }

  Submit(Form: NgForm)
  {
  }

  register(id: number){
    if (id===0){ // Registro Nuevo
      this.router.navigate(['medical-history',this.idParent,'others','adverse-event',id]);
    }
  }

  edit(id: number){
    this.router.navigate(['medical-history',this.idParent,'others','adverse-event',id]);
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
        this.api.delete(this.controller, id).subscribe(
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
