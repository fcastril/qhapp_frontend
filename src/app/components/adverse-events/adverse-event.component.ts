import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AdverseEventModel } from 'src/app/models/adverse-event.model';
import { AnswerModel } from 'src/app/models/adverse-event.model';

@Component({
  selector: 'app-adverse-event',
  templateUrl: './adverse-event.component.html',
  styleUrls: ['./adverse-event.component.scss']
})
export class AdverseEventComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'Eventos Adversos';
  controller= 'AdverseEvent';
  subtitle: string;
  reg = new AdverseEventModel();
  regAns = new AnswerModel();

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.idParent = localStorage.getItem('idParent');

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new AdverseEventModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: AdverseEventModel) => {
          this.reg = resp;
          this.regAns = JSON.parse(this.reg.answers);
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

        this.reg.answers = JSON.stringify(this.regAns);
        this.reg.idPatient = Number(this.idParent);

        if (this.reg.idAdverseEvent === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others','adverse-events']);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idAdverseEvent).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others','adverse-events']);
            }
          });
        }
      }
    });
  }

  regresar() {
    this.router.navigate(['medical-history',this.idParent,'others','adverse-events']);
  }

}
