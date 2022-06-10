import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReasonMovementModel } from 'src/app/models/reason-movement.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reason-movement',
  templateUrl: './reason-movement.component.html',
  styleUrls: ['./reason-movement.component.scss']
})
export class ReasonMovementComponent implements OnInit {

  id: string;
  title= 'Motivos - Movimientos';
  controller= 'reasonsmovements';
  navigateToPage='/reasons-movements';
  subtitle: string;
  reg = new ReasonMovementModel();
  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new ReasonMovementModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: ReasonMovementModel) => this.reg = resp
      );

    }
  }

  public Opciones = [
    // { id: '43', description: 'Movimientos Inventario' },
    // { id: '44', description: 'Salidas' },
    // { id: '45', description: 'Ajustes' },
    // { id: '51', description: 'Facturas' },
    { id: '52', description: 'Notas Crédito' },
    { id: '53', description: 'Notas Débito' }
  ];

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
        if (this.reg.idReasonMovement === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idReasonMovement).subscribe(
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
