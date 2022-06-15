import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";
import { ProfileModel } from "../../models/profile.model";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styles: [],
})
export class ProfilesComponent implements OnInit {
  regs: ProfileModel[] = [];
  searchText: "";
  title = "Perfiles";
  currentPage: number = 1;
  records: number = 10;
  constructor(private api: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.paginate();
  }
  paginate() {
    this.api
      .getPaginate("Profiles", this.currentPage, this.records, this.searchText)
      .subscribe((resp: any) => {
        this.regs = resp;
      });
  }
  Submit(Form: NgForm) {}

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
      this.route.navigate(["profiles", "0"]);
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
        this.api.delete("profiles", id).subscribe((resp: any) => {
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
