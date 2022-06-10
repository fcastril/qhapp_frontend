import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";
import { PatientModel } from "../../models/patient.model";
import { TypeDocumentModel } from "../../models/type-document.model";
import { DomSanitizer } from "@angular/platform-browser";

import { Select2Option } from "ng-select2-component";
import { Select2Model } from "../../models/select2.model";
import { AuthService } from "../../services/auth.service";
import { BaseClass } from "src/app/class/base.class";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent extends BaseClass implements OnInit {
  id: string;
  title = "Pacientes";
  titlePatientsData = "Datos del Paciente";
  titleElectronicBilling = "Datos Para Facturacion Electrónica";
  controller = "patients";
  navigateToPage = "/patients";
  subtitle: string;
  reg = new PatientModel();
  regTypeDocument = new TypeDocumentModel();
  requiredDV = false;
  isNit = false;
  isLegalPerson = false;
  listTypeDocuments: any[] = [];
  listTypeDocumentsSearch: any[] = [];
  listGenders: any[] = [];
  listCivilStatus: any[] = [];
  listCities: any[] = [];
  listInsuranceCompanies: any[] = [];
  listTypesConnection: any[] = [];
  listRelationShip: any[] = [];
  listTypeHearAbout: any[] = [];
  listTypeAccounting: any[] = [];

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: any;

  imagePath: any;

  datapru = new Select2Model();
  dataListTypePerson: Select2Option[] = [];
  dataListResidentialZone: Select2Option[] = [];
  dataListEconomicLevel: Select2Option[] = [];

  valueGender = "";

  patientOld: PatientModel ;
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


  // lista manual para Zona Residencial
  public listResidentialZone = [
    { id: "Urbano", description: "Urbano" },
    { id: "Rural", description: "Rural" },
  ];

  // lista manual para Tipo de Persona
  public listTypePerson = [
    { id: "Natural", description: "Natural" },
    { id: "Juridica", description: "Jurídica" },
  ];

  // lista manual para Nivel Economico
  public listEconomicLevel = [
    { id: 1, description: "1" },
    { id: 2, description: "2" },
    { id: 3, description: "3" },
    { id: 4, description: "4" },
    { id: 5, description: "5" },
    { id: 6, description: "6" },
  ];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    public authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {
    super(authService);
  }

  ngOnInit(): void {
    this.checkUser();

    setTimeout(() => {
      this.CargarMaestros();
    }, 1000);

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id === "0") {
      this.subtitle = "CREANDO";
      this.reg = new PatientModel();
    } else {
      this.subtitle = "EDITANDO";
      this.api
        .getId(this.controller, this.id)
        .subscribe((resp: PatientModel) => {
          this.reg = resp;
          this.BaseToImg(this.reg.picturePatient);
        });
    }
  }

  CargarMaestros() {
    // se carga la lista del select para Tipo Documento
    this.api.get("TypesDocuments").subscribe((resp: any) => {
      this.listTypeDocuments = resp;
      this.listTypeDocuments.unshift({
        idTypeDocument: 0,
        typeDocument: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Género
    this.api.get("Genders").subscribe((resp: any) => {
      this.listGenders = resp;
      this.listGenders.unshift({
        idGender: 0,
        gender1: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Estado Civil
    this.api.get("CivilStatus").subscribe((resp: any) => {
      this.listCivilStatus = resp;
      this.listCivilStatus.unshift({
        idCivilStatus: 0,
        civilStatus1: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Ciudades
    this.api.get("Cities").subscribe((resp: any) => {
      this.listCities = resp;
      this.listCities.unshift({
        idCity: 0,
        nameCity: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Aseguradoras
    this.api.get("InsuranceCompanies").subscribe((resp: any) => {
      this.listInsuranceCompanies = resp;
      this.listInsuranceCompanies.unshift({
        idInsuranceCompany: 0,
        nameInsuranceCompany: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Tipo de Vinculación
    this.api.get("TypesConnections").subscribe((resp: any) => {
      this.listTypesConnection = resp;
      this.listTypesConnection.unshift({
        idTypeConnection: 0,
        typeConnection: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Tipo de Relación con el Acompañante
    this.api.get("Relationships").subscribe((resp: any) => {
      this.listRelationShip = resp;
      this.listRelationShip.unshift({
        idRelationShip: 0,
        relationShip1: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Como se entero
    this.api.get("TypesHearAbouts").subscribe((resp: any) => {
      this.listTypeHearAbout = resp;
      this.listTypeHearAbout.unshift({
        idTypeHearAbout: 0,
        typeHearAbout: "Seleccione una opción",
      });
    });

    // se carga la lista del select para Regimen Contable
    this.api.get("TypeAccountings").subscribe((resp: any) => {
      this.listTypeAccounting = resp;
      this.listTypeAccounting.unshift({
        idTypeAccounting: 0,
        typeAccounting1: "Seleccione una opción",
      });
    });
  }

  public BaseToImg(dataBase64) {
    this.isImageSaved = true;
    this.cardImageBase64 = dataBase64;
  }

  // si se necesita descargar un archivo que esta como base64
  showPdf() {
    const linkSource =
      "data:application/pdf;base64," +
      " JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9Db2xvclNwYWNlL0";
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // al seleccioanr un tipo de dcto, se busca para saber si requiere DV
  public SearchDcto(event: any) {
    const ID = String(event.target.value);

    this.api.getId("TypesDocuments", ID).subscribe((resp: any) => {
      this.regTypeDocument = resp;
      this.reg.dvpatient = "";
      if (resp.requiredDV === true) {
        this.requiredDV = true;
      } else {
        this.requiredDV = false;
      }
      this.NitValidation();
    });
  }

  // al cargar la info de tipo dcto, se valida si es NIT para activar o desactivar campos y activar el tipo de persona
  public NitValidation() {
    const TYPE = this.regTypeDocument.typeDocument.toUpperCase();

    if (TYPE === "NIT") {
      this.isNit = true;
      this.reg.typePerson = "Juridica";
      this.BillingFields();
    } else {
      this.isNit = false;
      this.reg.typePerson = "Natural";
      this.BillingFields();
    }
  }

  // Con el tipo de persona, se activan o desactivan campos informativos
  public BillingFields() {
    if (this.reg.typePerson === "Natural") {
      this.isLegalPerson = false;
    } else {
      this.isLegalPerson = true;
    }
  }

  // Funcion de busqqueda del Select2
  SearchList(event: any) {
    this.valueGender = event.target.value;
  }

  // se llena el campo de FullName con los datos ingresados de Nombres y Apellidos individuales
  public OnBlurName() {
    const nombre1: string = this.reg.firstName;
    const nombre2: string = this.reg.secondName;
    const apellido1: string = this.reg.lastName;
    const apellido2: string = this.reg.lastSecondName;
    let nomaux = "";
    if (nombre1 !== undefined) {
      nomaux += nombre1;
    }
    if (nombre2 !== undefined) {
      nomaux += " " + nombre2;
    }
    if (apellido1 !== undefined) {
      nomaux += " " + apellido1;
    }
    if (apellido2 !== undefined) {
      nomaux += " " + apellido2;
    }
    this.reg.fullName = nomaux;
  }

  // Se genera el dato de Digito de Verificación para los tipos de documentos que lo necesiten
  public DVGenerator(event: any) {
    this.api.getParameter('Patients','documentpatient',this.reg.documentPatient).subscribe((resp:PatientModel)=>{
      this.reg = resp;
      if (this.reg.idPatient > 0){
        this.id = this.reg.idPatient.toString();
        Swal.fire({
          title: "Error",
          text: "El Paciente ya existe, se le permite actualizarlo",
          icon: "error",
        });
      }
    });
    
    if (this.regTypeDocument.requiredDV === true) {
      const nroDocumento = this.reg.documentPatient;
      let digito = 0;
      let sumatoria = 0;
      const primos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
      const limite = nroDocumento.length - 1;

      for (let i = 0; i < limite + 1; i++) {
        sumatoria += primos[i] * Number(nroDocumento[limite - i]);
      }

      digito = sumatoria % 11;
      if (digito > 1) digito = 11 - digito;

      this.reg.dvpatient = String(digito);
    }
  }

  // validaciones pendientes por si es contribuyente al impuesto de renta
  public isIncomeTaxButton(event: any) {
    this.reg.isIncomeTax = true;
  }

  // submit para guardar o editar la información agregada en el formulario
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
    }).then(
      (result) => {
        if (result.isConfirmed) {
          if (this.reg.idPatient === 0) {
            if (this.reg.dvpatient !== undefined) {
              this.reg.dvpatient = "";
            }
            this.reg.idUserNew = Number(localStorage.getItem("idUserLogin"));
            this.reg.idTypeDocument = Number(this.reg.idTypeDocument);
            this.reg.idCity = Number(this.reg.idCity);
            this.reg.idTypeConnection = Number(this.reg.idTypeConnection);
            this.reg.idTypeDocumenInCharge = Number(
              this.reg.idTypeDocumenInCharge
            );
            this.reg.idRelationShipInCharge = Number(
              this.reg.idRelationShipInCharge
            );
            this.reg.idTypeHearAbout = Number(this.reg.idTypeHearAbout);
            this.reg.idTypeAccounting = Number(this.reg.idTypeAccounting);
            this.reg.idListPrice = Number(this.reg.idListPrice);
            this.reg.idUserUpdated = Number(this.reg.idUserUpdated);
            this.reg.idCivilStatus = Number(this.reg.idCivilStatus);
            this.reg.idGender = Number(this.reg.idGender);
            this.reg.idInsuranceCompany = Number(this.reg.idInsuranceCompany);
            this.reg.economicLevel = Number(this.reg.economicLevel);
            this.api.post(this.controller, this.reg).subscribe((resp: any) => {
              if (resp.error) {
                Swal.fire(
                  "Error al crear el Registro",
                  "Se presentó un error al crear el registro",
                  "error"
                );
              } else {
                this.router.navigate([
                  "/inititalgeneral-attention",
                  resp.idPatient,
                ]);
              }
            });
          } else {
            this.reg.idUserUpdated = Number(
              localStorage.getItem("idUserLogin")
            );
            this.reg.dateTimeUpdated = new Date();
            this.api
              .put(this.controller, this.reg, this.reg.idPatient)
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
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // prueba de subida de archivo a base 64
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          "Maximo tamaño permitido es " + max_size / 1000 + "Mb";

        return false;
      }

      if (
        fileInput.target.files[0].type.includes(allowed_types[0]) &&
        fileInput.target.files[0].type.includes(allowed_types[1])
      ) {
        this.imageError = "Solo se permiten formatos ( JPG | PNG )";
        return false;
      }
      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.reg.picturePatient = imgBase64Path;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.reg.picturePatient = "";
  }
  back() {
    let isExternal: string = localStorage.getItem("isExternal");
    if (isExternal == "true") {
      this.router.navigate(["initialpage"]);
    } else {
      this.router.navigateByUrl(this.navigateToPage);
    }
  }
  loggout() {
    localStorage.clear();
    this.authService.loggout();
    window.location.reload();
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
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;

    this.isCamaraVisible = false;
            
    this.webcamImage = webcamImage;
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
