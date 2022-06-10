import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecipePatientModel } from 'src/app/models/recipe-patient.model';
import Swal from 'sweetalert2';

import { Select2Option, Select2,} from 'ng-select2-component';
import { Select2Model } from '../../models/select2.model';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-recipe-patient',
  templateUrl: './recipe-patient.component.html',
  styleUrls: ['./recipe-patient.component.scss']
})
export class RecipePatientComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'Recetas';
  controller = 'RecipesPatients';
  subtitle: string;
  reg = new RecipePatientModel();

  // data = new Select2Model();
  // valueRecipes = '';
  // listRecipes: Select2Option [] = [];
  listForm: any [] = [];
  listRecipes: any [] = [];
  

  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
                this.route.parent.params.subscribe(
                  parametros => {
                    this.idParent = parametros.id;
                  }
                );
              }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // se carga la lista del select para Formulas Credas
    this.api.get('Recipes').subscribe(
      (resp: any) =>{
        this.listForm = resp;
        this.listRecipes = resp;
        this.listRecipes.unshift({
          idRecipe: 0,
          nameRecipe: 'Seleccione una opción'
        });
      }
    );

    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new RecipePatientModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: RecipePatientModel) => this.reg = resp
      );
    }


  }

  public return() {
    this.router.navigate(['medical-history',this.idParent,'recipes-patients']);
  }

  public selectList(event: any) {
    const ID = Number(event.target.value);

    let message = '';
    this.listForm.forEach(element => {
      if(element.idRecipe === ID){
        message = element.descriptionRecipe;
      }
    });

    this.reg.descriptionRecipe += message;
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
        if (this.reg.idRecipePatient === 0){
          this.reg.dateRecipe = new Date();
          this.reg.idPatient = Number(this.idParent);
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'recipes-patients']);
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idRecipePatient).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigate(['medical-history',this.idParent,'recipes-patients']);
            }
          });
        }
      }
    });
  }

}
