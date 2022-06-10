import { Component, OnInit } from '@angular/core';
import { DailyAgendaModel } from '../../../models/dailyAgenda.model';
import { ApiService } from '../../../services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { StatusAppointmentModel } from '../../../models/status-appointments.model';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentRecordModel } from '../../../models/appointmentrecord.model';
import { DatePipe } from '@angular/common';

const WORDSLEN = 5;

@Component({
  selector: 'app-list-daily-agenda',
  templateUrl: './list-daily-agenda.component.html',
  styleUrls: ['./list-daily-agenda.component.scss']
})
export class ListDailyAgendaComponent implements OnInit {
  statusAppointment: StatusAppointmentModel[] = [];
  regs: DailyAgendaModel[] = [];
  reg = new DailyAgendaModel();
  appointment = new AppointmentRecordModel();
  sumPrice: number = 0;

  searchText:string= '';
  title = 'Agenda diaria';
  iconAgenda = 'calendar';
  public urlLink = '';
  closeResult = '';

  listTypesAgenda: any [] = [];
  idTypeAgenda: number = 0;


  constructor(private api: ApiService,
              private router: Router,
              private modalService: NgbModal,
              private datePipe: DatePipe) {
                this.api.get('TypesAgenda').subscribe(
                  (resp: any) =>{
                    this.listTypesAgenda = resp;
                    this.listTypesAgenda.unshift({
                      idTypeAgenda: 0,
                      typeAgenda: 'Seleccione el Tipo de Agenda.'
                    });
                  }
                );

              }

  ngOnInit(): void {
    // Captura ruta Url
    this.urlLink = this.router.url;
    if (this.searchText==='')
    {
      const fechaActual = new Date();
      this.searchText = this.datePipe.transform(fechaActual, 'yyyy-MM-dd');
      }
    this.search();
    this.searchStatus();
    this.appointment.price = 0;
  }
  search(){
    let searchTextUnion: string = this.searchText+'|'+this.idTypeAgenda.toString();
    this.api.getSearch('DailyAgenda', searchTextUnion).subscribe(
      (resp: DailyAgendaModel[])=>{
        this.regs = resp;
        this.regs.forEach(x=> {
          let observation =  x.observation.split(' ');
          let mensaje = '';
          let i=0;
          observation.forEach(obs => {
            if (i<=WORDSLEN){
              mensaje += ' '+obs;
            }
            i++;
          });
          x.observation = mensaje;
          if (i>=WORDSLEN){
            x.observation += '...';
          }
        });

        this.sumPrice = this.regs.reduce((sum, item)=>sum+item.price,0);
      }
    );
  }

  searchStatus() {
    this.api.getSearch('StatusAppointments', '').subscribe(
      (resp: any) => {
        this.statusAppointment = resp;
      }
    );
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

  Submit(Form: NgForm) { }



  keyupSearch(e: any)
  {
    console.log(e);
    if (e.keyCode === 13)
    {
      this.search();
    }
  }

  async changeStatus(idAppointmentRecord, content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let idStatus = result.form.value.idStatusAppointment;
      this.api.getId('AppointmentRecords', idAppointmentRecord).subscribe(
        (resp: any) => {
          this.appointment = resp;
          this.appointment.idStatusAppointment = Number(idStatus);
          this.update(this.appointment, idAppointmentRecord);
      })
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  update(appointment: AppointmentRecordModel, idAppointmentRecord: any) {
    this.api.put('AppointmentRecords',this.appointment, Number(idAppointmentRecord)).subscribe(
      (resp: any)=>{
      if (resp.error) {
          Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
      } else {
        this.search();
        this.searchStatus();
      }
    });
  }

  changePrice(idAppointmentRecord, contentPrice) {
    this.modalService.open(contentPrice, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let price = result.form.value.price;
      this.api.getId('AppointmentRecords', idAppointmentRecord).subscribe(
        (resp: any) => {
          this.appointment = resp;
          this.appointment.price = Number(price);
          this.update(this.appointment, idAppointmentRecord);
      })
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Invoice(documentPatient: string) {
    Swal.fire(
      'Facturar'
    )
  }

}
