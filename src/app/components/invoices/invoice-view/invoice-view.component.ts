import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ViewMovementsModel } from 'src/app/models/v_Movements.model';
import { ViewMovementsDetailsModel } from 'src/app/models/v_MovementsDetail.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  title: string = "Ver Factura";
  movement: ViewMovementsModel;
  movementDetail: ViewMovementsDetailsModel[];
  constructor(public dialogRef: MatDialogRef<InvoiceViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private api: ApiService) { }

   ngOnInit() {
    this.getInvoice();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getInvoice(): void {
    this.api.getId('Movements',this.data).subscribe((resp: ViewMovementsModel)=>
    {
      this.movement = resp;
      console.log('movement', this.movement);
    });
    this.api.getParameter('MovementsDetails','Movement',this.data.toString()).subscribe((resp: ViewMovementsDetailsModel) =>
    {
      this.movementDetail = resp;
      console.log('movementDetail', this.movementDetail);
    }
    );
  }
}
