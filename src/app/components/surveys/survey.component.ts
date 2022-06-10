import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseClass } from "src/app/class/base.class";
import { SurveyModel } from "src/app/models/survey.model";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.scss"],
})
export class SurveyComponent extends BaseClass implements OnInit {
  id: string;
  title = "Encuesta de Satisfacción";
  controller = "Survey";
  navigateToPage = "/surveys";
  subtitle: string;
  reg = new SurveyModel();

  constructor(public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {

    super(authService);
  }

  ngOnInit(): void {
    this.checkUser();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new SurveyModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller, this.id).subscribe(
        (resp: SurveyModel) => {
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
        
        this.reg.idSurvey = Number(this.id);
  
        if (this.reg.idSurvey === 0){
          this.reg.register = new Date();
  
          this.api.post(this.controller, this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.return();
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idSurvey).subscribe(
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
      this.router.navigate(['surveys']);
    }
   
  }
}
