import { Component, OnInit } from '@angular/core';
import { AttachedModel } from '../../../models/Attached.model';
import { FileItem } from '../../../models/file-item';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CargaDctoService } from '../../../services/carga-dcto.service';

@Component({
  selector: 'app-create-edit-attached-document',
  templateUrl: './create-edit-attached-document.component.html',
  styleUrls: ['./create-edit-attached-document.component.scss']
})
export class CreateEditAttachedDocumentComponent implements OnInit {

  id: string;
  title = 'Documentos adjuntos';
  subtitle: string;
  reg = new AttachedModel();
  idParent: string;

  /***************/
  archivos: FileItem[] = [];
  isImageSaved: boolean;
  cardImageBase64: any;
  imageError: string;
  /***************/

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, public _cargaDctos: CargaDctoService) {
    this.idParent = localStorage.getItem('idParent');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new AttachedModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId('AttachedDocument', this.id).subscribe(
        (resp: AttachedModel) => {
          this.reg = resp
        }
      );
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
        
        this.reg.idAttachedDocument = Number(this.id);
        this.reg.idPatient = Number(this.idParent);
  
        if (this.reg.idAttachedDocument === 0){
          this.reg.dateRegistration = new Date();

          this.api.post('AttachedDocument', this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'attached-document']);
            }
          });
        } else {
          this.reg.dateRegistration = new Date();
  
          this.api.put('AttachedDocument',this.reg, this.reg.idAttachedDocument).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'others', 'attached-document']);
            }
          });
        }
      }
    });
  }

  return() {
    this.router.navigate(['medical-history',this.idParent,'others', 'attached-document']);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

  cargarDctos(idProj: string, idComp: string) {
    const Part = Number(idProj);
    const SubPart = Number(idComp);
    this._cargaDctos.cargarDcto( this.archivos, Part, SubPart );
    this.limpiarArchivos();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['application/msword', 'application/pdf'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximo tamaño permitido es ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (fileInput.target.files[0].type.includes(allowed_types[0]) && fileInput.target.files[0].type.includes(allowed_types[1])){
          this.imageError = 'Solo se permiten formatos ( PDF | DOC )';
            return false;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            this.reg.document = image.src;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                  const imgBase64Path = e.target.result;
                  this.reg.document = imgBase64Path;
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
    this.reg.document = '';
  }

}
