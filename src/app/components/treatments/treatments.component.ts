import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentHeaderModel } from 'src/app/models/treatment-header.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ViewTreatmentHeaderFull } from 'src/app/models/v_TreatmentsHeadersFull.model';
import { ViewTreatmentDetailFull } from 'src/app/models/v_TreatmentsDetailsFull.model';
// import { ViewHeaderMeasureControl } from '../../models/v_HeaderMeasureControl.model';



@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
  providers: [DatePipe]
})
export class TreatmentsComponent implements OnInit {

  id: string;
  idParent: string;
  // regs: TreatmentHeaderModel[] = [];
  regs: ViewTreatmentHeaderFull[] = [];
  reg = new TreatmentHeaderModel();
  regFin = new TreatmentHeaderModel();
  searchText: '';
  title= 'Tratamientos';
  controller = 'TreatmentsHeaders';

  regsDetail: ViewTreatmentDetailFull[] = [];

  listReasonAppointment: any [] = [];
  listUsers: any [] = [];

  closeResult = '';

  newSessions = 0;
  agregar = false;
  restar = false;
  idx = 0;
  totalSessions = 0;
  ussedSessions = 0;
  diferencia = 0;
  seleccion = 0;

  // lista manual para acción cantidad citas
  public listActionSession = [
    { id: 0 , description: 'Seleccione una Acción' },
    { id: 1 , description: 'Adicionar Sesiones' },
    { id: 2 , description: 'Consumir Sesiones' }
  ];

  constructor(private api: ApiService,
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

    // se carga la lista del select para Motivo Cita
    this.api.get('ReasonsAppointments').subscribe(
      (resp: any) =>{
        this.listReasonAppointment = resp;
        this.listReasonAppointment.unshift({
        });
      }
    );

    // se carga la lista del select para Usuarios que estan habilitados para atender pacientes
    this.api.getParameter('Users','atencion', '1').subscribe(
      (resp: any) =>{
        this.listUsers = resp;
        this.listUsers.unshift({
        });
      }
    );

    // se carga la lista del select Accion de citas
    
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

  evolucion(id: number, idx: number) {
    
    if(this.regs[idx].numberSessionsAttended < this.regs[idx].numberSessionsAssigned){
      this.router.navigate(['medical-history',this.idParent,'treatment',id]);
    }else{
      Swal.fire('No se puede ingresar mas información','No quedan mas sesiones dispoibles', 'info');
    }
    
  }

  evolucionlaser(id: number) {
    this.router.navigate(['medical-history',this.idParent,'treatment-laser',id]);
  }

  verEvolucion(id: number) {
    this.router.navigate(['medical-history',this.idParent,'view-details-treatment',id]);
  }

  verEvolucionLaser(id: number) {
    this.router.navigate(['medical-history',this.idParent,'treatments-laser',id]);
  }

  cerrarAtencion(id: number, idx: number) {
    
    this.regFin = this.regs[idx];
    
    Swal.fire(
      {
        title: 'Finalizar Atención',
        text: '¿Desea Interrumpir el Tratamiento?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.regFin.attentionStatus = false;

        this.api.put(this.controller,this.regFin, this.regFin.idTreatmentHeader ).subscribe(
          (resp: any)=>{
          if (resp.error) {
              Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
          } else {
            // this.router.navigateByUrl('/daily-agenda');
            this.ngOnInit();
            Swal.fire('El tratamiento se interrumpio exitosamente','', 'success');
          }
        });

      }
    });

    
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

  // modal pra crear el encabezado de tratamientos
  async CreateRegister(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.reg.idReasonAppointment = Number(this.reg.idReasonAppointment);
      this.reg.idUser = Number(this.reg.idUser);
      this.reg.idPatient = Number(this.idParent);
      this.reg.dateStartAttention = new Date();
      this.reg.attentionStatus = true;
      this.NewRegister(this.reg);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  NewRegister(treatmentHeader: TreatmentHeaderModel) {
    this.api.post(this.controller,treatmentHeader ).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        // this.router.navigateByUrl('/daily-agenda');
        this.ngOnInit();
      }
    });
  }

  // modal pra modificar la cantidad de citas
  async editRegister(session, idheader: number, idx: number) {
  
    this.idx = idx;
    this.modalService.open(session, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.reg = this.regs[idx];

      if(this.agregar){
        this.reg.numberSessionsAssigned = Number(this.reg.numberSessionsAssigned) + Number(this.newSessions);
      }else{
        let number = Number(this.reg.numberSessionsAssigned) - Number(this.reg.numberSessionsAttended);
        if(number >= this.newSessions){
          this.reg.numberSessionsAssigned = Number(this.reg.numberSessionsAssigned) - this.newSessions;
        }else{
          Swal.fire('Error al modificar las sesiones','La cantidad que intenta consumir es mayor de la cantidad diponible', 'error');
          return;
        }
      }
      this.SaveData(this.reg);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  SaveData(treatmentHeader: TreatmentHeaderModel) {
    this.api.put(this.controller,treatmentHeader, treatmentHeader.idTreatmentHeader ).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        // this.router.navigateByUrl('/daily-agenda');
        this.limpiar();
        this.ngOnInit();
      }
    });
  }

  action(event: any) {
    const ID = Number(event.target.value);

    this.totalSessions = this.regs[this.idx].numberSessionsAssigned;
    this.ussedSessions = this.regs[this.idx].numberSessionsAttended;
    this.diferencia = this.totalSessions - this.ussedSessions;

    if(ID === 1){
      this.agregar = true;
      this.restar = false;
    }else{
      this.agregar = false;
      this.restar = true;
    }

  }

  limpiar() {
    this.seleccion = 0;
    this.newSessions = 0;
    this.agregar = false,
    this.restar = false;
  }

}
