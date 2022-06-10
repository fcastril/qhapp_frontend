import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewMovementsDetailsModel } from '../../../models/v_MovementsDetail.model';

import { Select2Data, Select2Option, Select2, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { Select2Model } from '../../../models/select2.model';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexGrid,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexStroke,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexLocale,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle,
  locales: ApexLocale[]
};

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [DatePipe]
})
export class BillingComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public lineChartOptions: Partial<ChartOptions>;
  public donutChartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;
  public barChartOptionsPatients: Partial<ChartOptions>;
  public barChartOptionsMoney: Partial<ChartOptions>;
  public lineChartOptionsUEN: Partial<ChartOptions>;
  public lineChartOptionsAppo: Partial<ChartOptions>;

  regs: any[] = [];
  search: string;
  icon = 'compass';

  title = 'Dashboard';
  subTitle = 'Facturación';

  listData;
  listValue;
  listGraphicPati;
  listDataHeartAbout;
  listValueHeartAbout;
  listPatientsMonth;
  listMoneyMonth;
  listMoneyMonthUEN1;
  listMoneyMonthUEN2;
  listAppointments1;
  listAppointments2;

  nameBilling1: string;
  nameBilling2: string;
  valueBilling1: number;
  valueBilling2: number;

  dateInitial: Date;
  dateFinal: Date;

  dateInitialGr1: Date;
  dateFinalGr1: Date;
  dateInitialGr2: Date;
  dateFinalGr2: Date;

  // datapru = new Select2Model();
  // dataListYears: Select2Option [] = [];

  yearSelect;
  yearSelectMoney;
  yearSelectMoneyUEN;
  yearSelectAppointment;

  public dataListYears = [
    { id: '2018', description: '2018' },
    { id: '2019', description: '2019' },
    { id: '2020', description: '2020' },
    { id: '2021', description: '2021' },
    { id: '2022', description: '2022' },
    { id: '2023', description: '2023' },
  ];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private datePipe: DatePipe) { 
                this.lineChartOptions = {};
                this.donutChartOptions = {};
                this.pieChartOptions = {};
                this.barChartOptionsPatients = {};
                this.barChartOptionsMoney = {};
                this.lineChartOptionsAppo = {};
              }
              

  ngOnInit(): void {
    // lista manual para Tipo de Persona
    // this.dataListYears = [
    //   {
    //       value: '2018', 
    //       label: '2018',
    //   },
    //   {
    //       value: '2019', 
    //       label: '2019',
    //   },
    //   {
    //       value: '2020', 
    //       label: '2020',
    //   },
    //   {
    //       value: '2021', 
    //       label: '2021',
    //   }
    // ]

    this.dateInitial = new Date();
    this.dateFinal = new Date();
    this.dateInitial.setDate(this.dateFinal.getDate()-30);
    this.dateInitialGr1 = this.dateInitial;
    this.dateFinalGr1 = this.dateFinal;
    this.dateInitialGr2 = this.dateInitial;
    this.dateFinalGr2 = this.dateFinal;
    this.yearSelect = (this.datePipe.transform(this.dateInitial, 'yyyy'));
    this.yearSelectMoney = (this.datePipe.transform(this.dateInitial, 'yyyy'));
    this.yearSelectMoneyUEN = (this.datePipe.transform(this.dateInitial, 'yyyy'));
    this.yearSelectAppointment = (this.datePipe.transform(this.dateInitial, 'yyyy'));
    this.infoCards();
    this.dataGraphicPatients(this.dateInitialGr1, this.dateFinalGr1);
    this.dataGraphicMoney(this.dateInitialGr2, this.dateFinalGr2);
    this.dataPatientsMonth(this.yearSelect);
    this.dataMoneyMonth(this.yearSelectMoney);
    this.dataMoneyMonthUEN(this.yearSelectMoneyUEN);
    this.dataAppointment(this.yearSelectAppointment);
  }

  infoCards() {
    this.api.getParameterDash('Movements','Cards','51').subscribe(
      (resp: any)=>{
        this.regs = resp;
        this.listData = JSON.parse(resp.dataList);
        this.listValue = JSON.parse(resp.dataValue);
        this.dataCards(this.listData, this.listValue);
      }
    );
  }

  dataCards(listData, listValue) {
    this.nameBilling1 = listData[0].Name;
    this.nameBilling2 = listData[1].Name;

    this.valueBilling1 = listValue[0];
    this.valueBilling2 = listValue[1];

    this.lineChartOptions = {
      series: [
        {
          name: "Data a",
          data: [45, 52, 38, 45]
        },
        {
          name: "Data b",
          data: [12, 42, 68, 33]
        },
        {
          name: "Data c",
          data: [8, 32, 48, 53]
        }
      ],
      colors: ["#f77eb9", "#7ee5e5","#4d8af0"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        height: 350,
        type: "bar",
        parentHeightOffset: 0
      },
      xaxis: {
        type: "datetime",
        categories: ["2015", "2016", "2017", "2018"]
      },
      title: {
        text: "My First Angular Chart"
      },
      markers: {
        size: 0
      },
      stroke: {
        width: 3,
        curve: "smooth",
        lineCap: "round"
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        containerMargin: {
          top: 30
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            legend: {
              fontSize: "11px"
            }
          }
        }
      ]
    }

  }

  dataGraphicPatients(dateInitial: Date, dateFinal: Date) {

    const DATEINI = (this.datePipe.transform(dateInitial, 'yyyy-MM-dd'));
    const DATEFIN = (this.datePipe.transform(dateFinal, 'yyyy-MM-dd'));

    let data: any[] = [];
    let labe: any[] = [];

    this.api.getParameterDash('Movements','graphicPatients','0', DATEINI, DATEFIN).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listGraphicPati = JSON.parse(resp.dataGraphicPatients);

        this.listGraphicPati.forEach(element => {
          data.push(element.Count);
          labe.push(element.Name);
        });

        this.graphicPatients(data, labe);
      }
    );
    
  }

  graphicPatients(data, labe){
    //// Donut chart options
    this.donutChartOptions = {
      nonAxisSeries: data,
      labels: labe,
      chart: {
        height: 300,
        type: "donut",
        parentHeightOffset: 0
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        colors: ['rgba(0,0,0,0)']
      },
      legend: {
        show: true,
        position: "right",
        horizontalAlign: 'left',
        containerMargin: {
          top: 30
        }
      },
      title: {
        text: "My Second Angular Chart"
      },
    };
  }

  dataGraphicMoney(dateInitial: Date, dateFinal: Date) {
    
    const DATEINI = (this.datePipe.transform(dateInitial, 'yyyy-MM-dd'));
    const DATEFIN = (this.datePipe.transform(dateFinal, 'yyyy-MM-dd'));

    let data: any[] = [];
    let labe: any[] = [];

    this.api.getParameterDash('Movements','graphicMoney','0', DATEINI, DATEFIN).subscribe(
      (resp: any)=>{
        this.listDataHeartAbout = JSON.parse(resp.dataHeart);
        this.listValueHeartAbout = JSON.parse(resp.valueHeart);

        this.listDataHeartAbout.forEach(element => {
          labe.push(element);
        });
        this.listValueHeartAbout.forEach(element => {
          data.push(element);
        });

        this.graphicMoney(data, labe);
      }
    );
    
  }

  graphicMoney(data, labe){
    // Pie chart options
    this.pieChartOptions = {
      nonAxisSeries: data,
      labels: labe,
      chart: {
        height: 300,
        type: "pie",
        parentHeightOffset: 0
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        colors: ['rgba(0,0,0,0)']
      },
      legend: {
        show: true,
        position: "right",
        horizontalAlign: 'left',
        containerMargin: {
          top: 30
        }
      },
      title: {
        text: "My thirt Angular Chart"
      },
    };
  }

  // Busca la información al entrar
  dataPatientsMonth(year) {

    let data: any[] = [];

    this.api.getParameterDash('Movements','graphicPatientsMonth','0', 'null', 'null', year).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listPatientsMonth = JSON.parse(resp.cantMonth);

        this.listPatientsMonth.forEach(element => {
          data.push(element);
        });

        this.PatientsMonth(data);
      }
    );
    
  }

  // Busca la información al seleccionar la fecha
  searchPatientsMonth(event: any) {
    const year = String(event.target.value);

    let data: any[] = [];

    this.api.getParameterDash('Movements','graphicPatientsMonth','0', 'null', 'null', year).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listPatientsMonth = JSON.parse(resp.cantMonth);

        this.listPatientsMonth.forEach(element => {
          data.push(element);
        });

        this.PatientsMonth(data);
      }
    );
    
  }

  PatientsMonth(data){
    // Bar chart options
     this.barChartOptionsPatients = {
      series: [
        {
          name: 'Nuevos Registros',
          data: data
        }
      ],
      colors: ["#7eb5ec"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        type: 'bar',
        height: 320,
        parentHeightOffset: 0
      },
      xaxis: {
        type: 'category',
        categories: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      },
      markers: {
        size: 0
      },
      stroke: {
        width: 3,
        curve: "smooth",
        lineCap: "round"
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        containerMargin: {
          top: 30
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            legend: {
              fontSize: "11px"
            }
          }
        }
      ]
    };
  }

  // Busca la información al entrar
  dataMoneyMonth(year) {

    let data: any[] = [];

    this.api.getParameterDash('Movements','graphicMoneyMonth','51', 'null', 'null', year).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listMoneyMonth = JSON.parse(resp.valueMonth);

        this.listMoneyMonth.forEach(element => {
          data.push(element);
        });

        this.MoneyMonth(data);
      }
    );
    
  }

  // Busca la información al seleccionar la fecha
  searchMoneyMonth(event: any) {
    const year = String(event.target.value);

    let data: any[] = [];

    this.api.getParameterDash('Movements','graphicPatientsMonth','0', 'null', 'null', year).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listPatientsMonth = JSON.parse(resp.cantMonth);

        this.listPatientsMonth.forEach(element => {
          data.push(element);
        });

        this.MoneyMonth(data);
      }
    );
    
  }

  MoneyMonth(data){
    // Bar chart options
     this.barChartOptionsMoney = {
      series: [
        {
          name: 'Nuevos Registros',
          data: data
        }
      ],
      colors: ["#7eb5ec"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        type: 'bar',
        height: 320,
        parentHeightOffset: 0
      },
      xaxis: {
        type: 'category',
        categories: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      },
      markers: {
        size: 0
      },
      stroke: {
        width: 3,
        curve: "smooth",
        lineCap: "round"
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        containerMargin: {
          top: 30
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            legend: {
              fontSize: "11px"
            }
          }
        }
      ]
    };
  }

  // Busca la información al entrar
  dataMoneyMonthUEN(year) {

    let dataUEN1: any[] = [];
    let dataUEN2: any[] = [];

    this.api.getParameterDash('Movements','graphicMoneyMonthUEN','51', 'null', 'null', year).subscribe(
      (resp: any)=>{
        // this.regs = resp;
        this.listMoneyMonthUEN1 = JSON.parse(resp.valueMonthUEN1);
        this.listMoneyMonthUEN2 = JSON.parse(resp.valueMonthUEN2);

        this.listMoneyMonthUEN1.forEach(element => {
          dataUEN1.push(element);
        });
        this.listMoneyMonthUEN2.forEach(element => {
          dataUEN2.push(element);
        });

        this.MoneyMonthUEN(dataUEN1,dataUEN2);
      }
    );
    
  }

  // Busca la información al seleccionar la fecha
  searchMoneyMonthUEN(event: any) {
    const year = String(event.target.value);

    let dataUEN1: any[] = [];
    let dataUEN2: any[] = [];

    this.api.getParameterDash('Movements','graphicMoneyMonthUEN','51', 'null', 'null', year).subscribe(
      (resp: any)=>{
        
        // this.regs = resp;
        this.listMoneyMonthUEN1 = JSON.parse(resp.valueMonthUEN1);
        this.listMoneyMonthUEN2 = JSON.parse(resp.valueMonthUEN2);

        this.listMoneyMonthUEN1.forEach(element => {
          dataUEN1.push(element);
        });
        this.listMoneyMonthUEN2.forEach(element => {
          dataUEN2.push(element);
        });

        this.MoneyMonthUEN(dataUEN1,dataUEN2);
      }
    );
    
  }

  MoneyMonthUEN(dataUEN1,dataUEN2){
    // Bar Group chart options
    this.lineChartOptionsUEN = {
      series: [
        {
          name: "Gloria",
          data: dataUEN1
        },
        {
          name: "Quality",
          data: dataUEN2
        }
      ],
      colors: ["#f77eb9","#7ee5e5","#4d8af0"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        height: 350,
        type: "bar",
        parentHeightOffset: 0
      },
      xaxis: {
        type: "category",
        categories: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      },
      title: {
        text: "My First Angular Chart"
      },
      markers: {
        size: 0
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        title: {
          text: '$ (Total)'
        }
      },
      stroke: {
        width: 3,
        curve: "smooth",
        lineCap: "round"
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        containerMargin: {
          top: 30
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            legend: {
              fontSize: "11px"
            }
          }
        }
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " total"
          }
        }
      }
    }
  }

  // Busca la información al entrar
  dataAppointment(year) {

    this.api.getParameterDash('Movements','graphicAppointments','0', 'null', 'null', year).subscribe(
      (resp: any)=>{
        
        // this.regs = resp;
        this.listAppointments1 = JSON.parse(resp.listAppointments);
        

        this.Appointment(this.listAppointments1);
      }
    );
    
  }

  // Busca la información al seleccionar el año
  searchAppointment(event: any) {
    const year = String(event.target.value);

    this.api.getParameterDash('Movements','graphicAppointments','0', 'null', 'null', year).subscribe(
      (resp: any)=>{
        
        // this.regs = resp;
        this.listAppointments1 = JSON.parse(resp.listAppointments);
        

        this.Appointment(this.listAppointments1);
      }
    );
    
  }

  Appointment(listAppointments1){
    // Bar Group chart options
    this.lineChartOptionsAppo = {
      series: listAppointments1,
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        height: 350,
        type: "bar",
        stacked: true,
        toolbar: {
          show: true
        },
        parentHeightOffset: 0
      },
      xaxis: {
        type: "category",
        categories: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      },
      title: {
        text: "My First Angular Chart"
      },
      markers: {
        size: 0
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        title: {
          text: '(Cantidad de Citas)'
        }
      },
      stroke: {
        width: 3
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        containerMargin: {
          top: 30
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            legend: {
              fontSize: "11px"
            }
          }
        }
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " total"
          }
        }
      }
    }
  }

}
