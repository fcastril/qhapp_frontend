import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // datos base
  id: string;
  title= 'Producto';
  controller= 'Products';
  navigateToPage='/products';
  subtitle: string;
  reg = new ProductModel();

  // datos del formulario
  listTypeProducts: any [] = [];
  listUEMs: any [] = [];

  // lista manual para Tipo Propiedad - Tipo de Bien
  public listTypeProperties = [
    { id: 'Producto', description: 'Producto' },
    { id: 'Servicio', description: 'Servicio' }
  ];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === '0') {
      this.subtitle = 'CREANDO';
      this.reg = new ProductModel();
    } else {
      this.subtitle = 'EDITANDO';
      this.api.getId(this.controller,this.id).subscribe(
        (resp: ProductModel) => this.reg = resp
      );
    }

    // se carga la lista del select para Tipo Producto
    this.api.get('TypesProducts').subscribe(
      (resp: any) =>{
        this.listTypeProducts = resp;
        this.listTypeProducts.unshift({
          idTypeProduct: 0,
          typeProduct: 'Seleccione un producto.'
        });
      }
    );

    // se carga la lista del select para UEM
    this.api.get('Uens').subscribe(
      (resp: any) =>{
        this.listUEMs = resp;
        this.listUEMs.unshift({
          idUen: 0,
          uen1: 'Seleccione una opción.'
        });
      }
    );


  }

  // submit para guardar o editar la información agregada en el formulario
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
        if (this.reg.idProduct === 0){

          this.reg.idUserNew = Number(localStorage.getItem('idUserLogin'));
          this.reg.idTypeProdct = Number(this.reg.idTypeProdct);
          this.reg.idUen = Number(this.reg.idUen);

          this.api.post(this.controller,this.reg).subscribe(
            (resp: any)=>{
            if (!resp) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        } else {
          this.reg.idUserUpdated = Number(localStorage.getItem('idUserLogin'));
          this.reg.dateTimeUpdated = new Date();
          this.api.put(this.controller,this.reg, this.reg.idProduct).subscribe(
            (resp: any)=>{
            if (!resp) {
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
            } else {
              this.router.navigateByUrl(this.navigateToPage);
            }
          });
        }
      }
    });


  }

}
