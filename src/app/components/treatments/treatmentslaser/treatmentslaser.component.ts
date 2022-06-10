import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewTreatmentLaserFull } from '../../../models/v_TreatmentsLaserFull.model';

@Component({
  selector: 'app-treatmentslaser',
  templateUrl: './treatmentslaser.component.html',
  styleUrls: ['./treatmentslaser.component.scss']
})
export class TreatmentslaserComponent implements OnInit {
  
  id: string;
  idParent: string;
  title= 'CONTROLES HARMONY REGISTRADOS';
  controller= 'TreatmentsDetailsLaser';
  regsDetail: ViewTreatmentLaserFull[] = [];
  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
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
        this.regsDetail = resp;
      }
    );
  }

  Submit(Form: NgForm) {

  }

  regresar() {
    this.router.navigate(['medical-history',this.idParent,'treatments']);
  }

}
