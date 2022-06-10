import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { TypeDocumentModel } from 'src/app/models/type-document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id: string;
  title= 'Usuarios';
  titleusersData = 'Datos del Usuario';
  controller= 'Users';
  navigateToPage='/users';
  subtitle: string;
  reg = new UserModel();
  regTypeDocument = new TypeDocumentModel();
  listTypeDocuments: any [] = [];
  listGenders: any [] = [];
  listCities: any [] = [];
  listProfiles: any [] = [];
  imageError: string;


  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private auth: AuthService,
              private http: HttpClient,
              private common: CommonService
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new UserModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: UserModel) =>{
          console.info('reg', resp);
          this.reg = resp;
      }
      );
    }




    // se carga la lista del select para Tipo Documento
    this.api.get('TypesDocuments').subscribe(
      (resp: any) =>{
        this.listTypeDocuments = resp;
        this.listTypeDocuments.unshift({
          idTypeDocument: 0,
          typeDocument: 'Seleccione el Tipo de Documento.'
        });
      }
    );

    // se carga la lista del select para Género
    this.api.get('Genders').subscribe(
      (resp: any) =>{
        this.listGenders = resp;
        this.listGenders.unshift({
          idGender: 0,
          gender1: 'Seleccione el Género.'
        });
      }
    );

    // se carga la lista del select para Perfiles
    this.api.get('Cities').subscribe(
      (resp: any) =>{
        this.listCities = resp;
        this.listCities.unshift({
          idCity: 0,
          nameCity: 'Seleccione la Ciudad.'
        });
      }
    );

    // se carga la lista del select para Ciudades
    this.api.get('Profiles').subscribe(
      (resp: any) =>{
        this.listProfiles = resp;
        this.listProfiles.unshift({
          idProfile: 0,
          nameProfile: 'Seleccione el perfil.'
        });
      }
    );
  }
  // se llena el campo de FullName con los datos ingresados de Nombres y Apellidos individuales
  public OnBlurName() {
    const nombre1: string = this.reg.firstNameUser;
    const nombre2: string = this.reg.secondNameUser;
    const apellido1: string = this.reg.lastFirstNameUser;
    const apellido2: string = this.reg.lastSecondNameUser;
    let nomaux = '';
    if ( nombre1 !== undefined ) { nomaux += nombre1; }
    if ( nombre2 !== undefined ) { nomaux += ' ' + nombre2; }
    if ( apellido1 !== undefined ) { nomaux += ' ' + apellido1; }
    if ( apellido2 !== undefined ) { nomaux += ' ' + apellido2; }
    // this.reg.fullName = nomaux;
  }

  // validaciones para usuario activo
  public isActive(event: any) {
    this.reg.active = true;
  }

  // validaciones si atiende pacientes
  public isattendPatients(event: any) {
    this.reg.attendPatients = true;
  }

  // submit para guardar o editar la información agregada en el formulario
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
        this.reg.idTypeDocument = Number(this.reg.idTypeDocument);
        this.reg.idGender = Number(this.reg.idGender);
        this.reg.idCity = Number(this.reg.idCity);
        this.reg.idProfile = Number(this.reg.idProfile);
        if (this.reg.idUser === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idUser).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          },
          (error: any)=>{
            Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
          });
        }
      }
    });




  }

  fileChangeEventSignature(fileInput: any) {
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
            this.reg.signature = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  fileChangeEventPicture(fileInput: any) {
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
            this.reg.pictureUser = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
