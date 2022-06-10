import { Component, OnInit } from '@angular/core';
import { ViewMovementsModel } from 'src/app/models/v_Movements.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invoices-medical-history',
  templateUrl: './invoices-medical-history.component.html',
  styleUrls: ['./invoices-medical-history.component.scss']
})
export class InvoicesMedicalHistoryComponent implements OnInit {

  id: string;
  invoices: ViewMovementsModel[]= [];
  
  constructor(private api: ApiService) {
    this.id = localStorage.getItem('idParent');
   }

  ngOnInit(): void {
    this.api.getMovement("Movements", "51",this.id.toString()).subscribe(
      (resp:ViewMovementsModel[]) => {
        this.invoices = resp;
      }
  );

  }

}
