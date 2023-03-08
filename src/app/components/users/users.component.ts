import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { ViewUserModel } from '../../models/v_Users.model';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  regs: ViewUserModel[] = [];
  searchText: "";
  title = "Usuarios";
  currentPage: number = 1;
  records: number = 10;

  constructor(private api: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.paginate();
  }

  Submit(Form: NgForm) {}
  paginate() {
    this.api
      .getPaginate("Users", this.currentPage, this.records, this.searchText)
      .subscribe((resp: any) => {
        this.regs = resp;
      });
  }
  search() {
    this.currentPage = 1;
    this.paginate();
  }
  keyupSearch(e: any) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  register(id: number) {
    if (id === 0) {
      // Registro Nuevo
      this.route.navigate(["user", "0"]);
    }
  }

  delete(id: number, idx: number) {
    Swal.fire({
      title: "Eliminar Registro",
      text: "¿Desea Eliminar el Registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("users", id).subscribe((resp: any) => {
          if (resp.error) {
            Swal.fire(
              "Error al Eliminar el Registro",
              "Se presentó un error al eliminar el registro",
              "error"
            );
          } else {
            this.regs.splice(idx, 1);
            Swal.fire("Registro Eliminado", "", "success");
          }
        });
      }
    });
  }
  back() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }
  next() {
    this.currentPage++;
    this.paginate();
  }
}
