import { Component, OnInit } from '@angular/core';
import { PhotographicModel } from '../../../models/photographic.model';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-photographic-evolution',
  templateUrl: './list-photographic-evolution.component.html',
  styleUrls: ['./list-photographic-evolution.component.scss']
})
export class ListPhotographicEvolutionComponent implements OnInit {

  regs: PhotographicModel[] = [];
  searchText: '';
  title = 'Evolución fotográfica';
  idParent: string;

  constructor(private api: ApiService, private route: Router, private router: ActivatedRoute) {
    this.idParent = localStorage.getItem('idParent');
  }

  ngOnInit(): void {
    this.search();
  }

  Submit(Form: NgForm) { }

  search() {
    this.api.getSearch('PhotographicEvolution', this.idParent).subscribe(
      (resp: any)=>{
        this.regs = resp;
      }
    );
  }

  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.search();
    }
  }

  edit(id: number) {
    this.route.navigate(['medical-history',this.idParent,'others', 'photographic-evolution', id]);
  }

  register(id: number){
    if (id===0){
      this.route.navigate(['medical-history',this.idParent,'others', 'photographic-evolution','0']);
    }
  }

  delete(id: number, idx: number){
    Swal.fire(
      {
        title: 'Eliminar Registro',
        text: '¿Desea Eliminar el Registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.api.delete('PhotographicEvolution', id).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
                Swal.fire('Error al Eliminar el Registro','Se presentó un error al eliminar el registro', 'error');
            } else {
             this.regs.splice(idx,1);
              Swal.fire('Registro Eliminado', '', 'success');
            }
          }
        );
      }
    });
  }

  viewPhoto(id: number, idx: number) {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

}
