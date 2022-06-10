import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailMeasureControlModel } from 'src/app/models/detail-measure-control.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DatepickerComponent } from '../../views/pages/ui-components/datepicker/datepicker.component';

@Component({
  selector: 'app-graphics-measure-control',
  templateUrl: './graphics-measure-control.component.html',
  styleUrls: ['./graphics-measure-control.component.scss'],
  providers: [DatePipe]
})
export class GraphicsMeasureControlComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'GRÁFICOS DE MEDIDAS';
  controller= 'DetailMeasuresControl';
  regs: DetailMeasureControlModel[] = [];
  // navigateToPage='/relations-ships';
  // info para graficos

  // fechas
  valoresDate: any [] = [];

  // Valores IMC
  valoresIMC: any [] = [];
  titleIMC = 'IMC';

  // Valores IMC
  valoresGRASE: any [] = [];
  titleGRASE = 'Pocentaje de Grasa';

  // Valores Current Weight
  valoresCWEIGHT: any [] = [];
  titleCWEIGHT = 'Relación de Peso';

  // Valores Suprapectoral
  valoresSUPRA: any [] = [];
  titleSUPRA = 'Suprapectoral';

  // Valores Subpectoral
  valoresSUBPEC: any [] = [];
  titleSUBPEC = 'Subpectoral';

  // Valores Abdomen Alto
  valoresHABDO: any [] = [];
  titleHABDO = 'Abdomen Alto';

  // Valores Cintura
  valoresWAIST: any [] = [];
  titleWAIST = 'Cintura';

  // Valores Abdomen Bajo
  valoresLOABDO: any [] = [];
  titleLOABDO = 'Abdomen Bajo';

  // Valores Cadera
  valoresHIP: any [] = [];
  titleHIP = 'Cadera';

  // Valores Muslo cm
  valoresTHINGM: any [] = [];
  titleTHINGM = 'Muslo';

  // Valores Brazo
  valoresARM: any [] = [];
  titleARM = 'Brazo';

  // Valores Tríceps
  valoresTRIC: any [] = [];
  titleTRIC = 'Tríceps';

  // Valores Subescapular
  valoresSUBES: any [] = [];
  titleSUBES = 'Subescapular';

  // Valores Suprailíaco
  valoresSUPRAIL: any [] = [];
  titleSUPRAIL = 'Suprailíaco';

  // Valores Abdominal
  valoresABDOM: any [] = [];
  titleABDOM = 'Abdominal';

  // Valores Supraespinoso
  valoresSUPRAES: any [] = [];
  titleSUPRAES = 'Supraespinoso';

  // Valores Muslo cm
  valoresTHINGP: any [] = [];
  titleTHINGP = 'Muslo';

  // Valores Pantorrilla
  valoresCALF: any [] = [];
  titleCALF = 'Pantorrilla';

  public lineChartLabels: Label[] = [];
  public lineChartDataIMC: ChartDataSets[] = [];
  public lineChartDataGRASE: ChartDataSets[] = [];
  public lineChartDataCWEIGHT: ChartDataSets[] = [];
  public lineChartDataSUPRA: ChartDataSets[] = [];
  public lineChartDataSUBPEC: ChartDataSets[] = [];
  public lineChartDataHABDO: ChartDataSets[] = [];
  public lineChartDataWAIST: ChartDataSets[] = [];
  public lineChartDataLOABDO: ChartDataSets[] = [];
  public lineChartDataHIP: ChartDataSets[] = [];
  public lineChartDataTHINGM: ChartDataSets[] = [];
  public lineChartDataARM: ChartDataSets[] = [];
  public lineChartDataTRIC: ChartDataSets[] = [];
  public lineChartDataSUBES: ChartDataSets[] = [];
  public lineChartDataSUPRAIL: ChartDataSets[] = [];
  public lineChartDataABDOM: ChartDataSets[] = [];
  public lineChartDataSUPRAES: ChartDataSets[] = [];
  public lineChartDataTHINGP: ChartDataSets[] = [];
  public lineChartDataCALF: ChartDataSets[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              display:false // lienas horizontales
          }
      }],
      yAxes: [{
          gridLines: {
              display:true // lineas verticales
          }   
      }]
  }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public gridLines: {
    drawOnChartArea: false
  }

  /**
   * Line chart for IMC
   */
  public lineChartColors: Color[] = [
    {
      borderColor: '#84bcec',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: '#84bcec',
      backgroundColor: 'rgba(0,0,0,0)',
    }
  ];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private datePipe: DatePipe) {
                this.route.parent.params.subscribe(
                  parametros => {
                    this.idParent = parametros.id;
                  }
                );
              }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getSearch( this.controller, this.id).subscribe(
      (resp: any)=>{
        this.regs = resp;
        this.listas(this.regs);
      }
    );
  }

  regresar(){
    this.router.navigate(['medical-history',this.idParent,'measures-control']);
  }

  Submit(Form: NgForm) {

  }

  listas(listas) {
    listas.forEach(element => {

      const Date = (this.datePipe.transform(element.dateRegistry, 'yyyy-MM-dd'));
      this.valoresDate.push(Date);
      this.valoresIMC.push(element.imc);
      this.valoresGRASE.push(element.grease);
      this.valoresCWEIGHT.push(element.currentWeight);
      this.valoresSUPRA.push(element.supraPectoral);
      this.valoresSUBPEC.push(element.subPectoral);
      this.valoresHABDO.push(element.highAbdomen);
      this.valoresWAIST.push(element.waist);
      this.valoresLOABDO.push(element.lowerAbdomen);
      this.valoresHIP.push(element.hip);
      this.valoresTHINGM.push(element.thingMeasure);
      this.valoresARM.push(element.arm);
      this.valoresTRIC.push(element.triceps);
      this.valoresSUBES.push(element.subEscapular);
      this.valoresSUPRAIL.push(element.suprailiac);
      this.valoresABDOM.push(element.abdominal);
      this.valoresSUPRAES.push(element.supraspinatus);
      this.valoresTHINGP.push(element.thighPercentage);
      this.valoresCALF.push(element.calf);
    });

    this.lineChartLabels = this.valoresDate;

    this.lineChartDataIMC = [
      { data: this.valoresIMC, label: 'IMC', fill: false }
    ];

    this.lineChartDataGRASE = [
      { data: this.valoresGRASE, label: '% de Grasa', fill: false }
    ];

    this.lineChartDataCWEIGHT = [
      { data: this.valoresCWEIGHT, label: 'Peso Actual', fill: false }
    ];

    this.lineChartDataSUPRA = [
      { data: this.valoresSUPRA, label: 'Suprapectoral', fill: false }
    ];

    this.lineChartDataSUBPEC = [
      { data: this.valoresSUBPEC, label: 'Subpectoral', fill: false }
    ];

    this.lineChartDataHABDO = [
      { data: this.valoresHABDO, label: 'Abdomen Alto', fill: false }
    ];

    this.lineChartDataWAIST = [
      { data: this.valoresWAIST, label: 'Cintura', fill: false }
    ];

    this.lineChartDataLOABDO = [
      { data: this.valoresLOABDO, label: 'Abdomen Bajo', fill: false }
    ];

    this.lineChartDataHIP = [
      { data: this.valoresHIP, label: 'Cadera', fill: false }
    ];

    this.lineChartDataTHINGM = [
      { data: this.valoresTHINGM, label: 'Muslo (cm)', fill: false }
    ];

    this.lineChartDataARM = [
      { data: this.valoresARM, label: 'Brazo', fill: false }
    ];

    this.lineChartDataTRIC = [
      { data: this.valoresTRIC, label: 'Tríceps', fill: false }
    ];

    this.lineChartDataSUBES = [
      { data: this.valoresSUBES, label: 'Subescapular', fill: false }
    ];

    this.lineChartDataSUPRAIL = [
      { data: this.valoresSUPRAIL, label: 'Suprailíaco', fill: false }
    ];

    this.lineChartDataABDOM = [
      { data: this.valoresABDOM, label: 'Abdominal', fill: false }
    ];

    this.lineChartDataSUPRAES = [
      { data: this.valoresSUPRAES, label: 'Muslo', fill: false }
    ];

    this.lineChartDataTHINGP = [
      { data: this.valoresTHINGP, label: 'Muslo (%)', fill: false }
    ];

    this.lineChartDataCALF = [
      { data: this.valoresCALF, label: 'Pantorrilla', fill: false }
    ];
  }


}
