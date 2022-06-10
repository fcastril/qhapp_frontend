import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ViewPatientsFull } from '../../models/v_PatientsFull.model';
import { SearchMedicalModel } from '../../models/search-medical.model';

@Component({
  selector: 'app-medical-histories',
  templateUrl: './medical-histories.component.html',
  styleUrls: ['./medical-histories.component.scss']
})
export class MedicalHistoriesComponent implements OnInit {

  reg = new SearchMedicalModel();
  regs: ViewPatientsFull[] = [];
  title= 'Medicina Estetica';
  searchText: '';
  listPatients: any [] = [];
  currentPage: number = 1;
  records: number =  10;
  totalRecords: number = 0;

  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit(): void {
    // se carga la lista del select para Tipo Producto
    this.paginate();
  }

  search(){
    if (!this.searchText)
    {
      this.searchText = '';
    }
    this.currentPage = 1;
    this.paginate();

  }
  paginate(){
    this.api.getPaginate('Patients', this.currentPage, this.records, this.searchText).subscribe(
      (resp: any) =>{
        this.regs = resp;
      }
    );
  }
  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.currentPage = 1;
      this.paginate();
    }
  }

  register(id: number){
    if (id===0){ // Registro Nuevo
      this.route.navigate(['patient','0']);
    }
  }

  SearchButton(id: number) {
    this.route.navigate(['medical-history',id]);
  }
  back(){
    if (this.currentPage>0){
      this.currentPage --;
      this.paginate();
    }  
  }
  next(){
    this.currentPage++;
    this.paginate();
  }
  Submit(Form: NgForm)
  {
  }


}
