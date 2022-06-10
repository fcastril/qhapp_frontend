import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { GeneralAttentionModel } from "../../../models/generalAttention.model";
import {
  AnswersModel,
  DigestivoModel,
  RespiratorioModel,
  RenalModel,
  EndocrinoModel,
  CirculatorioModel,
  NerviosoModel,
  MuscularModel,
  SistemaModel,
  QuirurgicosModel,
  AntecendentesModel,
  AlergicosModel,
  FamiliaresModel,
  FlacidezModel,
  ActividadesModel,
  AnalisisEsteticoModel,
  ObesidadModel,
  AdiposidadesModel,
  CelulitisModel,
  EstriasModel,
  VenasModel,
  SenosModel,
  GinecologicoModel,
} from "../../../models/answers.model";
import { AuthService } from "../../../services/auth.service";
import { BaseClass } from "src/app/class/base.class";

@Component({
  selector: "app-create-edit-general-attention",
  templateUrl: "./create-edit-general-attention.component.html",
  styleUrls: ["./create-edit-general-attention.component.scss"],
})
export class CreateEditGeneralAttentionComponent extends BaseClass implements OnInit {
  isEdit: string;
  id: string;
  title = "Atención General";
  subtitle: string;
  reg = new GeneralAttentionModel();
  idParent: string;

  // Respuestas
  answers = new AnswersModel();
  sistema = new SistemaModel();
  antecedentes = new AntecendentesModel();

  // Sistema
  digestivo = new DigestivoModel();
  respiratorio = new RespiratorioModel();
  renal = new RenalModel();
  endocrino = new EndocrinoModel();
  circulatorio = new CirculatorioModel();
  nervioso = new NerviosoModel();
  muscular = new MuscularModel();
  ginecologico = new GinecologicoModel();

  // Antecedentes
  quirurgicos = new QuirurgicosModel();
  alergicos = new AlergicosModel();
  familiares = new FamiliaresModel();

  // Actividades
  actividades = new ActividadesModel();

  // AnalisisEstetico
  analisisestetico = new AnalisisEsteticoModel();

  // Obesidad
  obesidad = new ObesidadModel();

  // Adiposidades
  adiposidades = new AdiposidadesModel();

  // Celulitis
  celulitis = new CelulitisModel();

  // Estrias
  estrias = new EstriasModel();

  // Venas
  venas = new VenasModel();

  // Senos
  senos = new SenosModel();

  // Flacidez
  flacidez = new FlacidezModel();

  listDisipline: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    public authService: AuthService
  ) {
    super(authService);

    this.route.parent.params.subscribe((parametros) => {
      this.idParent = parametros.id;
    });
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.api.get("Disciplines").subscribe((resp: any) => {
      this.listDisipline = resp;
      this.listDisipline.unshift({
        idDiscipline: 0,
        discipline1: "Seleccione la especialidad.",
      });
    });

    this.checkUser();

    if (this.id.toString() === "0") {
      this.subtitle = "CREANDO";
      this.reg = new GeneralAttentionModel();
    } else {
      this.subtitle = "EDITANDO";
      this.isEdit = localStorage.getItem("isEdit");
      this.api
        .getId("GeneralAttention", this.id.toString())
        .subscribe((resp: GeneralAttentionModel) => {
          this.reg = resp;
          if (this.reg == null) {
            this.reg = new GeneralAttentionModel();
            this.reg.answers = '';
            this.reg.idPatient = parseInt(this.id);
          } else {
            let dataAnswers = JSON.parse(this.reg.answers);
            this.answers = dataAnswers;
            this.digestivo = dataAnswers.Sistema.Digestivo;
            this.respiratorio = dataAnswers.Sistema.Respiratorio;
            this.renal = dataAnswers.Sistema.Renal;
            this.endocrino = dataAnswers.Sistema.Endocrino;
            this.circulatorio = dataAnswers.Sistema.Circulatorio;
            this.ginecologico = dataAnswers.Sistema.Ginecologico;
            this.nervioso = dataAnswers.Sistema.Nervioso;
            this.muscular = dataAnswers.Sistema.Muscular;
            this.quirurgicos = dataAnswers.Antecendentes.Quirurgicos;
            this.alergicos = dataAnswers.Antecendentes.Alergicos;
            this.familiares = dataAnswers.Antecendentes.Familiares;
            this.actividades = dataAnswers.Actividades;
            this.analisisestetico = dataAnswers.Analisisestetico;
            this.obesidad = dataAnswers.Obesidad;
            this.adiposidades = dataAnswers.Adiposidades;
            this.celulitis = dataAnswers.Celulitis;
            this.estrias = dataAnswers.Estrias;
            this.venas = dataAnswers.Venas;
            this.senos = dataAnswers.Senos;
            this.flacidez = dataAnswers.Flacidez;
          }
        });
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
        this.reg.idPatient = +this.id;
        this.reg.registrationDate = new Date();

        this.sistema.Digestivo = this.digestivo;
        this.sistema.Respiratorio = this.respiratorio;
        this.sistema.Renal = this.renal;
        this.sistema.Endocrino = this.endocrino;
        this.sistema.Circulatorio = this.circulatorio;
        this.sistema.Nervioso = this.nervioso;
        this.sistema.Muscular = this.muscular;
        this.sistema.Ginecologico = this.ginecologico;

        this.antecedentes.Quirurgicos = this.quirurgicos;
        this.antecedentes.Alergicos = this.alergicos;
        this.antecedentes.Familiares = this.familiares;

        this.answers.MotivoConsulta = this.answers.MotivoConsulta;
        this.answers.Sistema = this.sistema;
        this.answers.Antecendentes = this.antecedentes;
        this.answers.Actividades = this.actividades;
        this.answers.Analisisestetico = this.analisisestetico;
        this.answers.Obesidad = this.obesidad;
        this.answers.Adiposidades = this.adiposidades;
        this.answers.Celulitis = this.celulitis;
        this.answers.Estrias = this.estrias;
        this.answers.Venas = this.venas;
        this.answers.Senos = this.senos;
        this.answers.Flacidez = this.flacidez;

        this.reg.answers = JSON.stringify(this.answers);

        if (this.reg.idGeneralAttention === 0) {
          this.reg.lastUpdate = new Date();

          this.api.post("GeneralAttention", this.reg).subscribe((resp: any) => {
            if (resp.error) {
              Swal.fire(
                "Error al crear el Registro",
                "Se presentó un error al crear el registro",
                "error"
              );
            } else {
              this.whenisExternal();
            }
          });
        } else {
          this.reg.lastUpdate = new Date();

          this.api
            .put("GeneralAttention", this.reg, this.reg.idGeneralAttention)
            .subscribe((resp: any) => {
              if (resp.error) {
                Swal.fire(
                  "Error al actualizar el Registro",
                  "Se presentó un error al actualizar el registro",
                  "error"
                );
              } else {
                this.whenisExternal();
              }
            });
        }
      }
    });
  }

  return() {
    this.whenisExternal();
  }
  whenisExternal() {
    let isExternal: boolean = false;
    let localStorageisExternal = localStorage.getItem("isExternal");
    if (localStorageisExternal) {
      isExternal = localStorageisExternal === "true";
    }
    if (isExternal) {
      this.authService.loggout();
      this.router.navigate(["initialpatient", 0]);
    } else {
      this.router.navigate([
        "patients"
      ]);
    }
  }
}
