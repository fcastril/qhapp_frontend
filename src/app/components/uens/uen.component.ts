import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UenModel } from 'src/app/models/uen.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uen',
  templateUrl: './uen.component.html',
  styleUrls: ['./uen.component.scss']
})
export class UenComponent implements OnInit {

  id: string;
  title= 'UEN';
  controller= 'uens';
  navigateToPage='/uens';
  subtitle: string;
  reg = new UenModel();
  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new UenModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: UenModel) => this.reg = resp
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
        if (this.reg.idUen === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idUen).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        }
      }
    });
  }


}
