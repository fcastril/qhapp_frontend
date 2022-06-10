import { Component, OnInit } from '@angular/core';
import { NotesModel } from '../../../models/notes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-notes',
  templateUrl: './create-edit-notes.component.html',
  styleUrls: ['./create-edit-notes.component.scss']
})
export class CreateEditNotesComponent implements OnInit {

  id: string;
  title = 'Notas'
  subtitle: string;
  reg = new NotesModel();
  idParent: string;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    this.idParent = localStorage.getItem('idParent');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new NotesModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId('Note', this.id).subscribe(
        (resp: NotesModel) => {
          this.reg = resp
        }
      );
    }
  }

  Submit( form: NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach( ctrl => {
        ctrl.markAsTouched();
      });
  
      Swal.fire(
        {
          title: 'Error',
          text: 'Hacen falta campos obligatorios',
          icon: 'error'
        }
      );
      return;
    }
    Swal.fire(
      {
        title: 'Confirmar Guardar !!!',
        text: '¿Está seguro de guardar el registro actual?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        
        this.reg.idNote = Number(this.id);
        this.reg.idPatient = Number(this.idParent);
  
        if (this.reg.idNote === 0){
          this.reg.registrationDate = new Date();
  
          this.api.post('Note', this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'notes']);
            }
          });
        } else {
          this.reg.registrationDate = new Date();
  
          this.api.put('Note',this.reg, this.reg.idNote).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'notes']);
            }
          });
        }
      }
    });
  }

  return() {
    this.router.navigate(['medical-history',this.idParent,'others', 'notes']);
  }

}
