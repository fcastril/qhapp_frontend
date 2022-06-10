import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailMeasureControlModel } from 'src/app/models/detail-measure-control.model';
import { ViewPatientsFull } from 'src/app/models/v_PatientsFull.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

import { Select2Option, Select2,} from 'ng-select2-component';
import { Select2Model } from '../../models/select2.model';

@Component({
  selector: 'app-measure-control',
  templateUrl: './measure-control.component.html',
  styleUrls: ['./measure-control.component.scss']
})
export class MeasureControlComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'Control de Medidas';
  controller= 'DetailMeasuresControl';
  navigateToPage='/relations-ships';
  subtitle: string;
  reg1 = new DetailMeasureControlModel();
  regEdit = new DetailMeasureControlModel();
  regs: DetailMeasureControlModel[] = [];
  regPatient = new ViewPatientsFull();
  first = false;
  age: number = 0;
  isEdit = false;

  // data = new Select2Model();
  // valueNotes = '';
  // listAddNotes: Select2Option [] = [];
  listNotes: any [] = [];
  listAddNotes: any [] = [];


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
    // se carga la lista del select para Notas
    this.api.get('AddNotes').subscribe(
      (resp: any) =>{
        this.listNotes = resp;
        this.listAddNotes = resp;
        this.listAddNotes.unshift({
          idAddNote: 0,
          nameNote: 'Seleccione una opción'
        });
      }
    );

    this.api.getSearch( this.controller, this.id).subscribe(
      (resp: any)=>{
        this.regs = resp;
        this.regPatient = JSON.parse(localStorage.getItem('patientnow'));
        this.age = this.calculateAge(this.regPatient.dateBirth);
        this.regs.forEach((element: DetailMeasureControlModel)=>{
          element.grease = this.calculateGrease(element);
          element.imc = this.calculateIMC(element);
        });
        if(this.regs.length === 0){
          this.first = true;
        }else{
          const LAST = this.regs.length;
          this.reg1.desiredWeight = this.regs[LAST - 1].desiredWeight;
          this.reg1.size = this.regs[LAST - 1].size;
          this.reg1.idealWeight = this.regs[LAST - 1].idealWeight;
          this.reg1.minWeight = this.regs[LAST - 1].minWeight;
          this.reg1.maxWeight = this.regs[LAST - 1].maxWeight;
        }
        this.reg1.dateRegistry = new Date();
        this.reg1.idHeaderMeasureControl = Number(this.id);
      }
    );


  }
  calculateAge(dateBirth: Date): number {
    let value = 0;
    if (dateBirth){
       const convertAge = new Date(dateBirth);
       const timeDiff = Math.abs(Date.now() - convertAge.getTime());
       value = Math.floor((timeDiff / (1000*3600*24))/365);
    }

    return value;
  }

  activateRegister(idDetail, idx){
    this.regs[idx].isBlock = false;
  }

  saveRegister(idDetail, idx) {
    this.regs[idx].isBlock = true;
    this.regEdit = this.regs[idx];

    this.api.put(this.controller,this.regEdit, this.regEdit.idDetailMeasureControl).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        Swal.fire('Registro realizado','Se realizo la actualización correctamente', 'success');
        this.ngOnInit();
      }
    });
  }

  saveDetail() {
    const position = this.regs.length;
    this.regs[position - 1].desiredWeight = this.reg1.desiredWeight;
    this.regs[position - 1].size = this.reg1.size;
    this.regs[position - 1].idealWeight = this.reg1.idealWeight;
    this.regs[position - 1].minWeight = this.reg1.minWeight;
    this.regs[position - 1].maxWeight = this.reg1.maxWeight;
    this.regs[position - 1].observation = this.reg1.observation;
    this.regEdit = this.regs[position - 1];
    this.api.put(this.controller,this.regEdit, this.regEdit.idDetailMeasureControl).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al agregar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        this.reg1.observation = '';
      }
    });
  }

  regresar(){
    this.router.navigate(['medical-history',this.idParent,'measures-control']);
  }

  public OnBlurGrease() {
      this.reg1.grease = this.calculateGrease(this.reg1);
  }

  calculateGrease(data: DetailMeasureControlModel): number {
    const gender = localStorage.getItem('gender');
    let grease: number = 0;
    let valueBase: number = data.triceps + data.subEscapular + data.suprailiac + data.abdominal + data.thighPercentage + data.calf;
    let suma: number = 0;
    let oper: number = 0;
    if(gender === 'MASCULINO'){
      suma = valueBase * 0.1051;
      oper = suma + 2.585;
    }else{
      suma = valueBase * 0.1548;
      oper = suma + 3.580;
    }
    grease = oper;
    return +grease.toFixed(2);
  }


  public OnBlurIMC() {
      if (this.reg1.size>100){
        Swal.fire({
          icon: "error",
          title:"Talla / estatura",
          text:"La Talla / estatura debe estar en metros. Se procede a corregir la Talla / estatura"
        });
        this.reg1.size = this.reg1.size/100;
      }
      this.reg1.imc = this.calculateIMC(this.reg1);
}

  calculateIMC(data: DetailMeasureControlModel): number {
    const cuad = Math.pow(data.size, 2);
    const calc = data.currentWeight / cuad;
    return +calc.toFixed(2);
  }

  public selectList(event: any) {
    const ID = Number(event.target.value);

    let messa = '';
    this.listNotes.forEach(element => {
      if(element.idAddNote === ID){
        messa = element.descriptionNote;
      }
    });

    this.reg1.observation += messa;
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
        if (this.reg1.idDetailMeasureControl === 0){
          this.api.post(this.controller,this.reg1).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.reg1 = new DetailMeasureControlModel();
              this.ngOnInit();
            }
          });
        } else {
          this.api.put(this.controller,this.reg1, this.reg1.idDetailMeasureControl).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        }
      }
    });
  }

}
