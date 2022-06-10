import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe-patient-print',
  templateUrl: './recipe-patient-print.component.html',
  styleUrls: ['./recipe-patient-print.component.scss']
})
export class RecipePatientPrintComponent implements OnInit {

  id: string;
  idParent: string

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.parent.params.subscribe(
      parametros => {
        this.idParent = parametros.id;
      }
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public return() {
    this.router.navigate(['medical-history',this.idParent,'recipes-patients']);
  }

  public exportPDF(){
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p','pt','a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options). then((canvas)=>{
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult)=>{
      docResult.save(`${new Date().toISOString()}_formulamedica.pdf`);
    });
  }
}
