import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { ApiService } from 'src/app/services/api.service';
import { ViewAppointmentRecords } from '../../models/v_AppointmentRecords.model';
import { SchedulingModel } from '../../models/scheduling.model';


@Component({
  selector: 'app-schedules-general',
  templateUrl: './schedules-general.component.html',
  styleUrls: ['./schedules-general.component.scss']
})
export class SchedulesGeneralComponent implements OnInit {


  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;
  @Input() url: string;

  calendarPlugins = [resourceTimeGridPlugin]; // important!
  calendar :any;
  calendarEl: any;
  calendarEvents: any[] = [];
  locales =  [ esLocale ];
  regs: ViewAppointmentRecords[] = [];
  title: string = "Agenda General";
  listEvents: SchedulingModel [] = [];
  event = new SchedulingModel();


  eventos: EventInput [] = [];

  resources:any[] =[];

  constructor(private api: ApiService) {
    this.resources = [
      { id: '51', title: 'Doctora' },
      { id: '61', title: 'Accent Prime'},
      { id: '71', title: 'V. Shape' },
      { id: '81', title: 'Soprano' },
      { id: '91', title: 'Facial y Spa' }
      ];
    this.getTypeSchedules();
   }
   getTypeSchedules(){
    this.api.get('TypesAgenda').subscribe(
        (resp: any[])=> {
          this.resources = [];
          resp.forEach(element => {
            this.resources.push(
              {
                id: element.idTypeAgenda.toString(),
                title: `${element.typeAgenda}`
              }
            );
          });
          console.log(this.resources);
        }
    );
  }

  ngOnInit(): void {
    const calendar = document.getElementById('calendar');
    this.loadEvents();
  }

  loadEvents() {

    this.api.get('AppointmentRecords').subscribe(
      (resp: any)=>{
        console.log('agendas',resp);
        this.regs = resp;
        this.ListEvent(this.regs);
      }
    );


  }

  public ListEvent(regs: any) {

    this.calendarEvents = [];
    this.listEvents = [];

    regs.forEach(element => {
      this.event = new SchedulingModel();
      this.event.id = element.idAppointmentRecord,
      this.event.resourceId =element.idTypeAgenda.toString(),
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

 
  handleDateClick($event){

  }

  eventClick(arg){
  }

  handleModalTodoFormClose(){
    alert('se ha cerrado el modal');
 }


 eventDrop(arg){
 }

 eventResize(arg){
 }
}
