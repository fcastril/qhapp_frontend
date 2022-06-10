import { Component, OnInit } from '@angular/core';
import { AttachedModel } from '../../../models/Attached.model';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-attached-document',
  templateUrl: './list-attached-document.component.html',
  styleUrls: ['./list-attached-document.component.scss']
})
export class ListAttachedDocumentComponent implements OnInit {

  regs: AttachedModel[] = [];
  searchText: '';
  title = 'Documentos adjuntos';
  idParent: string;

  constructor(private api: ApiService, private route: Router, private router: ActivatedRoute) {
    this.idParent = localStorage.getItem('idParent');
  }
  
  ngOnInit(): void {
    this.search();
  }

  Submit(Form: NgForm) { }

  search() {
    this.api.getSearch('AttachedDocument', this.idParent).subscribe(
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
    this.route.navigate(['medical-history',this.idParent,'others', 'attached-document', id]);
  }

  register(id: number){
    if (id===0){
      this.route.navigate(['medical-history',this.idParent,'others', 'attached-document','0']);
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
        this.api.delete('AttachedDocument', id).subscribe(
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
