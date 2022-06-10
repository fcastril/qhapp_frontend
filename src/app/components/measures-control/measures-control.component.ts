import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMeasureControlModel } from 'src/app/models/header-measure-control.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ViewHeaderMeasureControl } from '../../models/v_HeaderMeasureControl.model';

@Component({
  selector: 'app-measures-control',
  templateUrl: './measures-control.component.html',
  styleUrls: ['./measures-control.component.scss'],
  providers: [DatePipe]
})
export class MeasuresControlComponent implements OnInit {

  idParent: string;
  regs: ViewHeaderMeasureControl[] = [];
  searchText: '';
  title= 'Control de Medidas';
  controller = 'HeaderMeasuresControl';
  reg = new HeaderMeasureControlModel();

  listTypeMeasures: any [] = [];

  closeResult = '';

  constructor( private api: ApiService,
               private router: Router,
               private route: ActivatedRoute,
               private modalService: NgbModal,
               private datePipe: DatePipe) {
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
    // se carga la lista del select Typo de Medidas
    this.api.get('TypesMeasures').subscribe(
      (resp: any) =>{
        this.listTypeMeasures = resp;
      }
    );
  }

  Submit(Form: NgForm)
  {
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

  search(){
    this.api.getSearch( this.controller, this.searchText).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }
  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.search();
    }
  }
  register(id: number){
    if (id===0){ // Registro Nuevo
      this.router.navigate(['measure-control']);
    }
  }

  llenado(id: number){
    if (id!==0){ // Registro Nuevo
      this.router.navigate(['medical-history',this.idParent,'measure-control',id]);
    }
  }

  graficos(id: number){
    if (id!==0){ // Registro Nuevo
      this.router.navigate(['medical-history',this.idParent,'graphics-measure-control',id]);
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

  async CreateRegister(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const idType = this.reg.idTypeMeasure;
      this.reg.dateInitial = new Date();
      this.reg.idTypeMeasure = Number(idType);
      this.reg.state = true;
      this.reg.idPatient = Number(this.idParent);
      this.NewRegister(this.reg);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  NewRegister(measureControl: HeaderMeasureControlModel) {
    this.api.post(this.controller,measureControl ).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        this.ngOnInit();
      }
    });
  }




}
