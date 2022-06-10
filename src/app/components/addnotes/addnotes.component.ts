import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddNoteModel } from 'src/app/models/add-note.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss']
})
export class AddNotesComponent implements OnInit {

  regs: AddNoteModel[] = [];
  searchText: '';
  title = 'Notas para Agregar';
  controller = 'AddNotes';
  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {
  }

  Submit(Form: NgForm)
  {
  }

  search(){
    this.api.getSearch(this.controller, this.searchText).subscribe(
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
      this.route.navigate(['addnote','0']);
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
