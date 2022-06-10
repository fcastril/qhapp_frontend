import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseClass } from "src/app/class/base.class";
import { PqrModel } from "src/app/models/pqr.model";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-pqrscreate-edit",
  templateUrl: "./pqrscreate-edit.component.html",
  styleUrls: ["./pqrscreate-edit.component.scss"],
})
export class PqrscreateEditComponent extends BaseClass implements OnInit {
  id: string;
  title = "PQRS";
  subtitle: string;
  reg = new PqrModel();
  idParent: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    public authService: AuthService
  ) {
    super(authService);
    this.idParent = localStorage.getItem('idParent');
  }

  ngOnInit(): void {
    this.checkUser();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new PqrModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId('pqrs', this.id).subscribe(
        (resp: PqrModel) => {
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
        
        this.reg.idPqr = Number(this.id);
  
        if (this.reg.idPqr === 0){
          this.reg.dateTimePQR = new Date();
  
          this.api.post('pqrs', this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.return();
            }
          });
        } else {
          this.api.put('pqrs',this.reg, this.reg.idPqr).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.return();
            }
          });
        }
      }
    });
  }
  return() {
    let isExternal:string = localStorage.getItem("isExternal");
    if (isExternal=='true') {
      this.router.navigate(['initialpage']);
    } else {
      this.router.navigate(['pqrs']);
    }
   
  }
}
