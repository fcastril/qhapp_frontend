import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AppointmentRecordModel } from '../../../models/appointmentrecord.model'

import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  primerDia;
  ultimoDia;
  citasAtt = 0;
  citasAll = 0;
  citasDay = 0;
  process = 0;
  end = 0;

  listAppointement: any [] = [];
  listTreatment;
  listTreatmentGraphic;
  listInsuranceGraphic;
  dataBasic;

  reg = new AppointmentRecordModel();

  title = 'Dashboard';
  subTitle = 'Medicina';

  //Doughnut chart
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  //Pie chart
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';

  //Colores para graficos
  public chartColors: Color[] = [
    { backgroundColor: ["#FFB6C1","#228B22","#fbbc06", "#7ee5e5","#E6E6FA","#F08080","#f77eb9","#4d8af0","#F0E68C","#6A5ACD","#98FB98"] }
  ];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    
    this.api.getParameter('AppointmentRecords','SearchDash', '0').subscribe(
      (resp: any) => {
        this.listAppointement = resp;
        this.citasAtt = this.listAppointement.length;
      }
    );

    this.api.getParameter('AppointmentRecords','SearchDashAll', '0').subscribe(
      (resp: any) => {
        this.listAppointement = resp;
        this.citasAll = this.listAppointement.length;
      }
    );

    this.api.getParameter('AppointmentRecords','SearchDashDay', '0').subscribe(
      (resp: any) => {
        this.listAppointement = resp;
        this.citasDay = this.listAppointement.length;
      }
    );

    this.api.getParameter('TreatmentsHeaders','SearchDashTreat', '0').subscribe(
      (resp: any) => {
        this.listTreatment = resp.listVista;
        this.process = this.listTreatment.length;
        this.treatments(this.listTreatment);
        
      }
    );

    this.api.getParameter('TreatmentsHeaders','SearchDashGrap', '0').subscribe(
      (resp: any) => {
        this.dataBasic = JSON.parse(resp.dataBasic);
        this.listTreatmentGraphic = this.dataBasic;
        this.graphicTreatment(this.listTreatmentGraphic);
      }
    );

    this.api.getParameter('Patients','Graphic', '0').subscribe(
      (resp: any) => {
        this.dataBasic = JSON.parse(resp.dataChart);
        this.listInsuranceGraphic = this.dataBasic;
        this.graphicInsurance(this.listInsuranceGraphic);
      }
    );

  }

  private treatments(listTreatment: any) {
    listTreatment.forEach(element => {
      if(!element.attentionStatus){
        this.end ++;
      }
    });
  }

  private graphicTreatment(listTreatment: any) {
    listTreatment.forEach(element => {
      this.doughnutChartLabels.push(element.Name);
      this.doughnutChartData.push(element.Count);
    });
  }

  private graphicInsurance(listInsurance: any) {
    listInsurance.forEach(element => {
      this.pieChartLabels.push(element.Name);
      this.pieChartData.push(element.Count);
    });
  }

  

  



}
