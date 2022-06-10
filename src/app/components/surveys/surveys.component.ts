import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyModel } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  regs: SurveyModel[] = [];
  searchText: "";
  title = "Encuestas";

  
  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {
    this.getSurveys();
  }
  getSurveys() {
    this.api.get('Surveys').subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }

  submit(f: NgForm){
    
  }

  register(id: number){
    if (id===0){ // Registro Nuevo
      this.route.navigate(['survey','0']);
    }
  }

  delete(id: number, idx: number){

  }

}
