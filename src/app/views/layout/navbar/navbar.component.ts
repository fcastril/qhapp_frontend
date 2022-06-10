import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TypeAgendaModel } from '../../../models/type-agenda.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Username = '';
  Email = ''

  regs: TypeAgendaModel[] = [];
  item ;
  calendars = [];


  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) { 
    // construcción de memú agendas dinamicas
    this.api.get('TypesAgenda').subscribe(
      (resp: any)=>{
        this.regs = resp;
        this.item = {
          label: 'General',
          link: '/schedules-general',
          icon: 'calendar'
        };
        this.calendars.push(this.item);
        let i = 0;
        this.regs.forEach(element => {
          this.item = {
              label: element.typeAgenda,
              link: '/schedules/'+ element.idTypeAgenda,
              icon: 'calendar'
            }
            this.calendars.push(this.item);
            i ++;
        });
      }
    );

  }

  ngOnInit(): void {
    this.Username = localStorage.getItem('userName');
    this.Email = localStorage.getItem('login');
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    this.auth.loggout();
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
