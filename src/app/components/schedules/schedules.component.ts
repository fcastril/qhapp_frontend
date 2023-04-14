import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input, SimpleChange, SimpleChanges, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { SchedulingModel } from '../../models/scheduling.model';
import { AppointmentRecordModel } from '../../models/appointmentrecord.model';
import { ViewAppointmentRecords } from '../../models/v_AppointmentRecords.model';

import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { EventEmitter } from 'events';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentRecordComponent } from '../appointment-records/appointment-record.component';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;
  @Input() url: string;
  id: string;
  regs: ViewAppointmentRecords[] = [];
  searchText: '';
  title= 'Registro de Citas';
  currentDate: any;


  // listEvents: SchedulingModel [] = [];
  // event = new SchedulingModel();
  listEvents: SchedulingModel [] = [];
  event = new SchedulingModel();

  eventos: EventInput [] = [];
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin]; // important!
  calendarEvents: EventInput[] = [];

  locales =  [ esLocale ];
  calendar :any;
  calendarEl: any;

  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
                route.params.subscribe(val=>{
                  this.id = val.id;
                  this.api.getSearch('AppointmentRecords', val.id).subscribe(
                    (resp: any)=>{
                      this.regs = resp;
                      this.ListEvent(this.regs);
                    }
                  );
                  this.changeTitle(val.id);

                });
              }
  changeTitle(id:string) {
    if (id==='0'){
      this.title="Agenda General";
    } else {
      this.api.getId('typesAgenda', id).subscribe(
        (resp: any)=>{
          this.title=`Agenda ${resp.typeAgenda}`;
        }
      )
    }
  }


  ngOnInit(): void {
    const calendar = document.getElementById('calendar');

    this.url = this.router.url;

    this.id = this.route.snapshot.paramMap.get('id');
    let date = new Date();
    this.currentDate = date.toISOString();
  }

  public ListEvent(regs: any) {

    this.calendarEvents = [];

    // var eventSources = calendar.getEventSources();
    // var len = eventSources.length;
    // for (var i = 0; i < len; i++) {
    //     eventSources[i].remove();
    // }

    this.listEvents = [];

    regs.forEach(element => {
      this.event = new SchedulingModel();
      this.event.id = element.idAppointmentRecord,
      this.event.start = element.dateTimeInitial,
      this.event.end = element.dateTimeFinal,
      this.event.title = element.typeAgenda+'\n'+ element.fullName + '-' + element.documentPatient+'\n'+element.reasonAppointment,
      this.event.description = element.observation,
      this.event.backgroundColor = element.colorStatusAppointment,
      this.event.borderColor = element.colorStatusAppointment,
      this.event.textColor = '#FEFFFF'
      this.listEvents.push(this.event);
    });

    this.calendarEvents = [... this.listEvents];
  }

  // acción para eventos nuevos
  handleDateClick(arg) {
    this.router.navigate(['appointment-record','0',arg.dateStr,this.id]);
  }

  // acción para eventos ya existentes
  eventClick(arg){
    const idunic = arg.event.id;
    this.router.navigate(['appointment-record',idunic,'',this.id]);
  }

  handleModalTodoFormClose(){
    alert('se ha cerrado el modal');
 }



eventDrop(arg){
  const idunic = +arg.event.id;
   let item: any = this.regs.filter(x=>x.idAppointmentRecord===idunic)[0];
   item.dateTimeInitial = arg.event.start;
   item.dateTimeFinal = arg.event.end;

   let dateInitialSelected = item.dateTimeInitial.getMinutes()-(5*60);
   item.dateTimeInitial.setMinutes(dateInitialSelected);
   let dateFinalSelected = item.dateTimeFinal.getMinutes()-(5*60);
   item.dateTimeFinal.setMinutes(dateFinalSelected);
   this.api.put('appointmentRecords',item, idunic).subscribe((resp:any)=>console.log(resp));

}

eventResize(arg){
  const idunic = +arg.event.id;
   let item: any = this.regs.filter(x=>x.idAppointmentRecord===idunic)[0];
   item.dateTimeInitial = arg.event.start;
   item.dateTimeFinal = arg.event.end;

   let dateInitialSelected = item.dateTimeInitial.getMinutes()-(5*60);
   item.dateTimeInitial.setMinutes(dateInitialSelected);
   let dateFinalSelected = item.dateTimeFinal.getMinutes()-(5*60);
   item.dateTimeFinal.setMinutes(dateFinalSelected);
   this.api.put('appointmentRecords',item, idunic).subscribe((resp:any)=>console.log(resp));
}
}
