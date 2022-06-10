import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMeasureControlModel } from 'src/app/models/header-measure-control.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { RecipePatientModel } from '../../models/recipe-patient.model';


@Component({
  selector: 'app-recipes-patients',
  templateUrl: './recipes-patients.component.html',
  styleUrls: ['./recipes-patients.component.scss']
})
export class RecipesPatientsComponent implements OnInit {

  idParent: string;
  regs: RecipePatientModel[] = [];
  searchText: '';
  title = 'Recetas';
  controller = 'RecipesPatients';

  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute,) {
                this.route.parent.params.subscribe(
                  parametros => {
                    this.idParent = parametros.id;
                  }
                );
              }

  ngOnInit(): void {
    this.api.getSearch( this.controller, this.idParent).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }

  Submit(Form: NgForm)
  {
  }

  public edit(id: number) {
    this.router.navigate(['medical-history',this.idParent,'recipe-patient',id]);
  }

  public CreateRegister(id: number){
    if (id===0){ // Registro Nuevo
      this.router.navigate(['medical-history',this.idParent,'recipe-patient',id]);
    }
  }

  delete(id: number, idx: number){
    Swal.fire(
      {
        title: 'Eliminar Registro',
        text: '¿Desea Eliminar el Registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.api.delete(this.controller, id).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
                Swal.fire('Error al Eliminar el Registro','Se presentó un error al eliminar el registro', 'error');
            } else {
             this.regs.splice(idx,1);
              Swal.fire('Registro Eliminado', '', 'success');

            }
          }
        );

      }
    });
  }


  print(id: number, idx: number){
    this.router.navigate(['medical-history',this.idParent,'recipe-patient-print',id]);
  }
}
