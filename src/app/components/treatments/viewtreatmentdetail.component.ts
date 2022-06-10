import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewTreatmentDetailFull } from 'src/app/models/v_TreatmentsDetailsFull.model';

@Component({
  selector: 'app-viewtreatmentdetail',
  templateUrl: './viewtreatmentdetail.component.html',
  styleUrls: ['./viewtreatmentdetail.component.scss']
})
export class ViewtreatmentdetailComponent implements OnInit {

  id: string;
  idParent: string;
  title= 'NOTAS REGISTRADAS';
  controller= 'TreatmentsDetails';
  regsDetail: ViewTreatmentDetailFull[] = [];

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

    this.api.getSearch( 'TreatmentsDetails', this.id).subscribe(
      (resp: any)=>{
        this.regsDetail = resp;
      }
    );
  }

  Submit( Form: NgForm) {

  }

  regresar() {
    this.router.navigate(['medical-history',this.idParent,'treatments']);
  }



}
