import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TypeMovementModel } from '../../models/type-movement.model';

@Component({
  selector: 'app-type-movement',
  templateUrl: './type-movement.component.html',
  styleUrls: ['./type-movement.component.scss']
})
export class TypeMovementComponent implements OnInit {

  id: string;
  title= 'Tipo de Movimiento';
  controller= 'typesmovements';
  navigateToPage='/types-movements';
  subtitle: string;
  reg = new TypeMovementModel();

  public TypesMultipliers = [
    { id: 0, description: 'Ninguno' },
    { id: 1, description: 'Sumar' },
    { id: -1, description: 'Restar' }
  ];

  public Opciones = [
    { id: '43', description: 'Movimientos Inventario' },
    // { id: '44', description: 'Salidas' },
    // { id: '45', description: 'Ajustes' },
    { id: '51', description: 'Facturas' },
    { id: '52', description: 'Notas Crédito' },
    { id: '53', description: 'Notas Débito' }
  ];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new TypeMovementModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: TypeMovementModel) => this.reg = resp
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

      this.reg.multiplier = Number(this.reg.multiplier);
      this.reg.consecutive = Number(this.reg.consecutive);
      this.reg.finalResolutionDIAN = Number(this.reg.finalResolutionDIAN);
      this.reg.initialResolutionDIAN = Number(this.reg.initialResolutionDIAN);

      if (result.isConfirmed) {
        if (this.reg.idTypeMovement === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (!resp) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idTypeMovement).subscribe(
            (resp: any)=>{
            if (!resp) {
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
