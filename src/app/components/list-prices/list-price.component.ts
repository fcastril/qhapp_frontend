import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ListPricesModel } from '../../models/listPrices.model';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styles: [
  ]
})
export class ListPriceComponent implements OnInit {

  id: string;
  title= 'Lista de Precios';
  subtitle: string;
  controller = 'ListPrices'
  reg = new ListPricesModel();
  Products: any [] = [];
  TypeList: any [] = [];

  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.api.get('Products').subscribe(
      (resp: any) => {
        this.Products = resp
        this.Products.unshift({
          idProduct:  0,
          descriptionProduct: 'Seleccione un producto'        
        });
      });

      // List types price lists
      this.api.get('TypesPriceLists').subscribe(
        (resp: any) =>{
          this.TypeList = resp;
          this.TypeList.unshift({
            idTypePriceList: 0,
            typePriceList : 'Seleccione un tipo de lista precios'
          });
        });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new ListPricesModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: ListPricesModel) => this.reg = resp
      );

    }
  }

  Submit( form: NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach( ctrl => {
        ctrl.markAsTouched();
      });

      Swal.fire(
        {
          title: 'Error',
          text: 'Hacen falta campos obligatorios',
          icon: 'error'
        }
      );
      return;
    }
    Swal.fire(
      {
        title: 'Confirmar Guardar !!!',
        text: '¿Está seguro de guardar el registro actual?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.reg.idProduct = Number(this.reg.idProduct);
        this.reg.idTypeListPrice = Number(this.reg.idTypeListPrice);
        if (this.reg.idListPrice === 0){
          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl('list-price');
            }
          });
        } else {
          this.api.put(this.controller,this.reg, this.reg.idListPrice).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl('list-price');
            }
          });
        }
      }
    });
  }


}
