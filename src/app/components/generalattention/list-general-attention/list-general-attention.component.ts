import { Component, OnInit } from '@angular/core';
import { GeneralAttentionModel } from '../../../models/generalAttention.model';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-general-attention',
  templateUrl: './list-general-attention.component.html',
  styleUrls: ['./list-general-attention.component.scss']
})
export class ListGeneralAttentionComponent implements OnInit {

  regs: GeneralAttentionModel[] = [];
  searchText: '';
  title = 'Atención General';
  idParent: string;

  constructor(private api: ApiService, private route: Router, private router: ActivatedRoute) {
    this.router.parent.params.subscribe(
      parametros => {
        this.idParent = parametros.id;
      }
    );
  }

  ngOnInit(): void {
    this.search();
  }

  Submit(Form: NgForm) { }

  search(){
    this.api.getSearch('GeneralAttention', this.idParent).subscribe(
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

  edit(id: number) {
    localStorage.setItem('isEdit', 'true');
    this.route.navigate(['medical-history',this.idParent,'general-attention',id]);
  }

  register(id: number){
    if (id===0){
      this.route.navigate(['medical-history',this.idParent,'general-attention','0']);
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
        this.api.delete('GeneralAttention', id).subscribe(
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

  viewGeneralAttention(id: number) {
    localStorage.setItem('isEdit', 'false');
    this.route.navigate(['medical-history',this.idParent,'general-attention',id]);
  }

}
