import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseClass } from 'src/app/class/base.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.scss']
})
export class InitialpageComponent extends BaseClass implements OnInit {

  constructor(private router: Router, public authService: AuthService) { 
    super(authService);
  }

  ngOnInit(): void {
    this.checkUser();
  }
  registerPatient(){

    this.router.navigate(['initialpatient',0]);
  }
  pqrs(){

    this.router.navigate(['initialpqrs',0]);
  }
  encuestas(){

    this.router.navigate(['initialsurvey',0]);
  }
  salir(){
    this.authService.loggout();
    this.router.navigate(['auth/login']);
  }
}
