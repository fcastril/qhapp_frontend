import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { FileItem } from '../models/file-item';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CargaDctoService {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private common: CommonService
  ) {}

  cargarDcto(dctos: FileItem[], idProj?: number, idConfig?: number) {
    for (const file of dctos) {
      const fileToUpload = file.archivo;
      const formData = new FormData();

      let NOMBRE = fileToUpload.name;
      idProj = idProj ?? 0;
      idConfig = idConfig ?? 0;

      if (idProj > 0) {
        NOMBRE = idProj + '-' + fileToUpload.name;
      }

      if (idProj > 0 && idConfig > 0) {
        NOMBRE = idProj + '-' + idConfig + '-' + fileToUpload.name;
      }

      formData.append('file', fileToUpload, NOMBRE);

      this.http
        .post(`${this.common.getUrl()}Uploads`, formData, {
          headers: this.auth.getHeaders(),
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((event: any) => {
          let progress: number;
          let message: string;

          if (event.type === HttpEventType.UploadProgress) {
            progress = Math.round((100 * event.loaded) / event.total);
            file.progreso = progress;
          }
          // tslint:disable-next-line: align
          else if (event.type === HttpEventType.Response) {
            message = 'Carga completa.';
            file.estaSubiendo = true;
            this.onUploadFinished.emit(event.body);
          }
        });
    }
  }

  private guardarDcto(dcto: any) {
    // mandamos a una tabla en la BD la información del dcto para ser almacenada
    this.http.post(`${this.common.getUrl()}/upload`, dcto);
  }
}
