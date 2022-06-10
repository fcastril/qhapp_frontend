import { Component, OnInit } from '@angular/core';
import { NotesModel } from '../../../models/notes.model';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {

  regs: NotesModel[] = [];
  searchText: '';
  title = 'Notas';
  idParent: string;

  constructor(private api: ApiService, private route: Router, private router: ActivatedRoute) {
    this.idParent = localStorage.getItem('idParent');
  }

  ngOnInit(): void {
    this.search();
  }

  Submit(Form: NgForm) { }

  search() {
    this.api.getSearch('Note', this.idParent).subscribe(
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
    this.route.navigate(['medical-history',this.idParent,'others', 'notes', id]);
  }

  register(id: number){
    if (id===0){
      this.route.navigate(['medical-history',this.idParent,'others', 'notes','0']);
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
        this.api.delete('Note', id).subscribe(
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
