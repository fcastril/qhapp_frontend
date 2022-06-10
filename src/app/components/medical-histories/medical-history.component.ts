import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { PatientModel } from '../../models/patient.model';
import { ViewPatientsFull } from '../../models/v_PatientsFull.model';
import { TypeDocumentModel } from '../../models/type-document.model';
import { DomSanitizer } from '@angular/platform-browser';
import { TreatmentHeaderModel } from 'src/app/models/treatment-header.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { PhotoInterface } from 'src/app/interfaces/photo.interface';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {

  id: string;
  title= 'Historia Clinica';
  subtitle: string;
  reg = new ViewPatientsFull();
  controller= 'Patients';

  titlePatientsData = 'Paciente';

  imagePath: any;

  listAppointements: any [] = [];
  nextAppointment: any;
  lastAppointment: any;
  dateRegistration: any;
  age: any = 0;

  FECHA = new Date();

  regsTreatments: TreatmentHeaderModel [] = [];
  citasAbiertas = 0;
  citasCerradas = 0;

  listAppointmentRecord: any [] = [];
  closeResult = '';


  isCamaraVisible: boolean = false;

  //Camara WEB
  
  public showWebcam = true;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
      // width: {ideal: 1024},
      // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage = null;
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private _sanitizer: DomSanitizer,
              private datePipe: DatePipe,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new ViewPatientsFull();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getParameter(this.controller,'History',this.id).subscribe(
        (resp: ViewPatientsFull) => {
          this.reg = resp;
          localStorage.setItem('patientnow', JSON.stringify(this.reg));
          if(this.reg.picturePatient !== ''){
            this.imagePath = this.reg.picturePatient
          }else{
            this.imagePath = './../../assets/drop-images.png'
          }
          this.dateRegistration = this.reg.dateTimeNew;
          this.Citas();
        }
      );
    }
    
    this.api.getSearch( 'TreatmentsHeaders', this.id).subscribe(
      (resp: any)=>{
        
        this.regsTreatments = resp;

        this.regsTreatments.forEach(element => {
          if(element.attentionStatus){
            this.citasAbiertas ++;
          }else{
            this.citasCerradas ++;
          }
        });
      }
    );

  }

  public Citas() {
    
    this.api.getParameter('AppointmentRecords','Patient',this.id).subscribe(
      (resp: any) => {
        this.listAppointmentRecord = resp; // lista para visualizar las citas del paciente
        this.listAppointements = resp;
        let fechabase = (this.datePipe.transform(this.FECHA, 'yyyy-MM-dd hh:mm:ss'));
        if(this.listAppointements.length === 1){
          this.nextAppointment = this.listAppointements[(this.listAppointements.length - 1)].dateTimeInitial;
          this.lastAppointment = this.nextAppointment;
        }
        if(this.listAppointements.length > 1){
          if(this.listAppointements[(this.listAppointements.length - 1)].dateTimeInitial > fechabase){ // I need comparation date's !!!!
            this.nextAppointment = this.listAppointements[(this.listAppointements.length - 1)].dateTimeInitial;
            this.lastAppointment = this.listAppointements[(this.listAppointements.length - 2)].dateTimeInitial;
          }else{
            this.nextAppointment = this.listAppointements[(this.listAppointements.length - 1)].dateTimeInitial;
            this.lastAppointment = this.nextAppointment;
          }
        }
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
  }

  // modal pra crear el encabezado de tratamientos
  async AppointmentHistory(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  onCamara() {
    this.isCamaraVisible = !this.isCamaraVisible;
  }


  
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {

    const imgBase64Path = webcamImage.imageAsDataUrl;
            this.reg.picturePatient = imgBase64Path;
            this.imagePath = imgBase64Path;

    this.isCamaraVisible = false;
            
    this.webcamImage = webcamImage;
    let photo: PhotoInterface = {
      id: this.reg.idPatient,
      photo: this.reg.picturePatient
    };

    this.api.updatePhoto(photo).subscribe((resp)=>{
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
