import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { profile } from "console";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";
import { ProfileModel } from "../../models/profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  id: string;
  title = "Perfiles";
  controller = "profiles";
  navigateToPage = "/profiles";
  subtitle: string;
  reg = new ProfileModel();
  regs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.api
      .getId("ProfileOptions/GetOptions", this.id)
      .subscribe((resp: any) => {
        this.regs = resp;
      });

    if (this.id === "0") {
      this.subtitle = "CREANDO";
      this.reg = new ProfileModel();
    } else {
      this.subtitle = "EDITANDO";
      this.api
        .getId(this.controller, this.id)
        .subscribe((resp: ProfileModel) => (this.reg = resp));
    }
  }

  Submit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((ctrl) => {
        ctrl.markAsTouched();
      });

      Swal.fire({
        title: "Error",
        text: "Hacen falta campos obligatorios",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Confirmar Guardar !!!",
      text: "¿Está seguro de guardar el registro actual?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.reg.idProfile === 0) {
          this.api.post(this.controller, this.reg).subscribe((resp: any) => {
            if (resp.error) {
              Swal.fire(
                "Error al crear el Registro",
                "Se presentó un error al crear el registro",
                "error"
              );
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api
            .put(this.controller, this.reg, this.reg.idProfile)
            .subscribe((resp: any) => {
              if (resp.error) {
                Swal.fire(
                  "Error al actualizar el Registro",
                  "Se presentó un error al actualizar el registro",
                  "error"
                );
              } else {
                this.router.navigateByUrl(this.navigateToPage);
              }
            });
        }
      }
    });
  }

  SubmitProfileOptions(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((ctrl) => {
        ctrl.markAsTouched();
      });

      Swal.fire({
        title: "Error",
        text: "Hacen falta campos obligatorios",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Confirmar Guardar Prueba!!!",
      text: "¿Está seguro de guardar el registro actual?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.regs.length > 0) {
          this.api.post("ProfileOptions", this.regs).subscribe((resp: any) => {
            if (resp.error) {
              Swal.fire(
                "Error al crear el Registro",
                "Se presentó un error al crear el registro",
                "error"
              );
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        }
        // else {
        //   this.api.put(this.controller,this.reg, this.reg.idProfile).subscribe(
        //     (resp: any)=>{
        //     if (resp.error) {
        //         Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
        //     } else {
        //       this.router.navigateByUrl(this.navigateToPage);
        //     }
        //   });
        // }
      }
    });
  }
}
