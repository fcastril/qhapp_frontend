import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AppointmentRecordModel } from '../../../models/appointmentrecord.model'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy {

  title = 'Dashboard';
  subTitle = 'Agendamiento';
  subTitleOverdure = 'Citas Vencidas';
  subTitlesSchedule = 'Citas Agendadas';

  citasAtt = 0;

  regsOverdure: any[] = [];
  regsSchedule: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private api: ApiService) {
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.api.getParameter('AppointmentRecords','SearchDateMinor', '0').subscribe(
      (resp: any) => {
        this.regsOverdure = resp;
      }
    );

    this.api.getParameter('AppointmentRecords','SearchDateMajor', '0').subscribe(
      (resp: any) => {
        this.regsSchedule = resp;
      }
    );
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
