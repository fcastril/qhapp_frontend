import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ApiService } from "src/app/services/api.service";
import { ViewUserModel } from "src/app/models/v_users.model";
import { ViewRecipePatientModel } from "src/app/models/v_recipe-patient.model";

@Component({
  selector: "app-recipe-patient-print",
  templateUrl: "./recipe-patient-print.component.html",
  styleUrls: ["./recipe-patient-print.component.scss"],
})
export class RecipePatientPrintComponent implements OnInit {
  id: string;
  idUser: string;
  idParent: string;
  controller = "RecipesPatients";
  controllerUser = "Users";
  subtitle: string;
  reg = new ViewRecipePatientModel();
  regUser = new ViewUserModel();
  isExportPDF = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.route.parent.params.subscribe((parametros) => {
      this.idParent = parametros.id;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.idUser = localStorage.getItem("idUserLogin");
    this.api
      .getId(this.controller, this.id)
      .subscribe((resp: ViewRecipePatientModel) => (this.reg = resp));
    this.api
      .getId(this.controllerUser, this.idUser)
      .subscribe((resp: ViewUserModel) => (this.regUser = resp));
  }

  public return() {
    this.router.navigate([
      "medical-history",
      this.idParent,
      "recipes-patients",
    ]);
  }

  public exportPDF() {
    this.isExportPDF = false;
    const DATA = document.getElementById("htmlData");
    const doc = new jsPDF("p", "pt", "a4");
    const options = {
      background: "white",
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL("image/PNG");

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width + 20;
        doc.addImage(
          img,
          "PNG",
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${this.reg.documentPatient}_formulamedica.pdf`);
        this.isExportPDF = true;
      });
  }
}
