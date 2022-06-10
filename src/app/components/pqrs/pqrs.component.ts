import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { BaseClass } from "src/app/class/base.class";
import { PqrModel } from "src/app/models/pqr.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-pqrs",
  templateUrl: "./pqrs.component.html",
  styleUrls: ["./pqrs.component.scss"],
})
export class PqrsComponent  implements OnInit {
  regs: PqrModel[] = [];
  searchText: "";
  title = "PQRS";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit(): void {



    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
    };
  }
  Submit(Form: NgForm) {}

  search() {
    this.api.getSearch("pqrs", this.searchText).subscribe((resp: any) => {
      this.regs = resp;
      this.dtTrigger.next();
    });
  }
  keyupSearch(e: any) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  register(id: number) {
    if (id === 0) {
      this.route.navigate(["pqrs", "0"]);
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
        this.api.delete("pqrs", id).subscribe((resp: any) => {
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
  typePqrName(typePQR: number): string {
    switch (typePQR) {
      case 1: {
        return "Petición";
      }
      case 2: {
        return "Queja";
      }
      case 3: {
        return "Reclamo";
      }
      case 4: {
        return "Sugerencia";
      }
      default: {
        return "Sugerencia";
      }
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
