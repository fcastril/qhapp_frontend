import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report-products',
  templateUrl: './report-products.component.html',
  styles: [
  ]
})
export class ReportProductsComponent implements OnInit {

  regs: any[] = [];
  icon = 'compass';
  title = 'Consulta de Inventario';
  product: string;

  constructor( private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    
  }

  Submit(Form: NgForm)
  { 
    this.search();
  }

  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.search();
    }
  }

  search(){
    this.regs = [];
    this.api.getId('ReportInventories/InventoryProduct', this.product).subscribe(
      (resp: any) =>{
        this.regs = resp;
      }
    );
  }

}
