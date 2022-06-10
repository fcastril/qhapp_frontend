import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute) {
    this.id = localStorage.getItem('idParent'); 
  }

  ngOnInit(): void {
  
  }

  Submit(Form: NgForm)
  {
  }

}
