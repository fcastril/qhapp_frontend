import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginModel } from "src/app/models/login.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  user: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onLoggedin(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedin", "true");
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login(form: NgForm) {
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
    this.auth.login(this.user).subscribe(
      (resp: any) => {
        if (resp) {
          this.router.navigate([this.returnUrl]);
        } else {
          Swal.fire({
            title: "Error",
            text: "Error de Autenticación",
            icon: "error",
          });
        }
      },
      (error: any) => {
        console.error("error:", error);
        Swal.fire({
          title: "Error",
          text: "Error de Autenticación/n" + error.error,
          icon: "error",
        });
      }
    );
  }

  initialPage() {
    this.router.navigate(["/initialpage"]);
  }
}
