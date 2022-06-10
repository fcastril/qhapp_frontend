import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SignaturePad } from "angular2-signaturepad";
import { ConsentModel } from "src/app/models/consent.model";
import { PatientConsentModel } from "src/app/models/patient-consents.model";
import { PatientModel } from "src/app/models/patient.model";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-consetmedical",
  templateUrl: "./consetmedical.component.html",
  styleUrls: ["./consetmedical.component.scss"],
})
export class ConsetmedicalComponent implements OnInit, AfterViewInit {
  title: string = "Consentimiento informado";
  subtitle: string = "Creando";
  id: string = "0";
  reg: PatientConsentModel = new PatientConsentModel();
  listConsents: ConsentModel[] = [];
  idConsent: number = -1;
  regConsent: ConsentModel = new ConsentModel();
  idParent: string;
  Patient: PatientModel = new PatientModel();

  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };

  isVisibleSave: boolean = true;
  isEdit: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.idParent = localStorage.getItem("idParent");
    console.log('idParent', this.idParent);
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getListConsents();
    this.getPatient();


    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new PatientConsentModel();
      this.isEdit = false;
      this.isVisibleSave = true;
    } else {
      this.subtitle = 'VER';
      this.isEdit = true;
      this.api.getId('PatientConsents', this.id).subscribe(
        (resp: PatientConsentModel) => {
          this.reg = resp;
          this.isVisibleSave = false;
        }
      );
    }

  }
  
  getPatient(){
    this.api.getId("Patients", this.idParent).subscribe((resp: PatientModel)=>{
      this.Patient = resp;
    });
  }
  getListConsents() {
    this.api.get("Consents").subscribe((resp: ConsentModel[]) => {
      this.listConsents = resp;
    });
  }
  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  selectConsent() {
    this.regConsent = this.listConsents[this.idConsent];
    this.regConsent.descriptionConsent = this.regConsent.descriptionConsent.replace('#documento#', this.Patient.documentPatient)
                                                                           .replace('#paciente#', this.Patient.fullName)
                                                                           .replace('#fecha#', this.datePipe.transform(this.reg.dateSignature, 'yyyy-MM-dd'));

    this.reg.descriptionConsent = this.regConsent.descriptionConsent;
    this.reg.nameConsent = this.regConsent.nameConsent;
    
  }
  drawComplete() {
    this.reg.signature = this.signaturePad.toDataURL();
  }
  clearSignature() {
    this.signaturePad.clear();
  }

  Submit(f: NgForm) {
    if (f.invalid) {
      Object.values(f.controls).forEach( ctrl => {
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
        
        this.reg.idPatientConsent = Number(this.id);
        this.reg.idPatient = Number(this.idParent);
  
        if (this.reg.idPatientConsent === 0){
          this.reg.dateSignature = new Date();
  
          this.api.post('PatientConsents', this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'consents-medical']);
            }
          });
        } else {
          this.reg.dateSignature = new Date();
  
          this.api.put('PatientConsents',this.reg, this.reg.idPatientConsent).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'consents-medical']);
            }
          });
        }
      }
    });
  }
  return() {
    this.router.navigate(['medical-history',this.idParent,'others', 'consents-medical']);
  }
}
