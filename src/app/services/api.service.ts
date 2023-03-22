import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PhotoInterface } from "../interfaces/photo.interface";
import { AuthService } from "./auth.service";
import { CommonService } from "./common.service";
import { PaginationRequestModel } from '../models/pagination.model';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private common: CommonService
  ) {}

  getObservable(controller: string) {
    return this.http.get<any[]>(`${this.common.getUrl()}${controller}`, {
      headers: this.auth.getHeaders(),
    });
  }

  get(controller: string) {
    return this.http.get(`${this.common.getUrl()}${controller}`, {
      headers: this.auth.getHeaders(),
    });
  }
  getId(controller: string, id: string) {
    return this.http.get(`${this.common.getUrl()}${controller}/${id}`, {
      headers: this.auth.getHeaders(),
    });
  }
  getCode(controller: string, code: string, id: number) {
    return this.http.get(`${this.common.getUrl()}${controller}/${code}/${id}`, {
      headers: this.auth.getHeaders(),
    });
  }
  getSearch(controller: string, search: string) {
    if (!search)
      return this.http.get(`${this.common.getUrl()}${controller}`, {
        headers: this.auth.getHeaders(),
      });
    else
      return this.http.get(
        `${this.common.getUrl()}${controller}/search/${search}`,
        { headers: this.auth.getHeaders() }
      );
  }

  getPaginate(
    controller: string,
    page: number,
    records: number,
    search: string
  ) {
    if (!search)
      return this.http.get(
        `${this.common.getUrl()}${controller}/paginate/${page}/${records}`,
        { headers: this.auth.getHeaders() }
      );
    else
      return this.http.get(
        `${this.common.getUrl()}${controller}/paginate/${page}/${records}/${search}`,
        { headers: this.auth.getHeaders() }
      );
  }
  getPagination(request: PaginationRequestModel, controller: string, parameter: string=''){

    if (parameter != ''){
      return this.http.post(
        `${this.common.getUrl()}${controller}/paginate/${parameter}`,
          request,
          { headers: this.auth.getHeaders() }
      );
    }

    return this.http.post(
      `${this.common.getUrl()}${controller}/paginate`,
        request,
        { headers: this.auth.getHeaders() }
    );
  }
  getParameter(controller: string, type: string, search: string) {
    return this.http.get(
      `${this.common.getUrl()}${controller}/${type}/${search}`,
      { headers: this.auth.getHeaders() }
    );
  }
  getParameterDash(
    controller: string,
    type: string,
    search: string,
    dateIni?: string,
    dateFin?: string,
    year?: string
  ) {
    return this.http.get(
      `${this.common.getUrl()}${controller}/${type}/${search}/${dateIni}/${dateFin}/${year}`,
      { headers: this.auth.getHeaders() }
    );
  }
  getPermission(
    controller: string,
    id: string,
    option: string,
    typeOption: string
  ) {
    return this.http.get(
      `${this.common.getUrl()}${controller}/${id}/${option}/${typeOption}`,
      { headers: this.auth.getHeaders() }
    );
  }
  getMovement(controller: string, option: string, search?: string) {
    if (search == "" || search == undefined) {
      return this.http.get(
        `${this.common.getUrl()}${controller}/GetOption/${option}`,
        { headers: this.auth.getHeaders() }
      );
    } else {
      return this.http.get(
        `${this.common.getUrl()}${controller}/GetOptionFilter/${option}/${search}`,
        { headers: this.auth.getHeaders() }
      );
    }
  }
  delete(controller: string, id: number) {
    return this.http.delete(`${this.common.getUrl()}${controller}/${id}`, {
      headers: this.auth.getHeaders(),
    });
  }

  post(controller: string, data: any) {
    return this.http.post(`${this.common.getUrl()}${controller}`, data, {
      headers: this.auth.getHeaders(),
    });
  }
  put(controller: string, data: any, id: number) {
    return this.http.put(`${this.common.getUrl()}${controller}/${id}`, data, {
      headers: this.auth.getHeaders(),
    });
  }
  updatePhoto(photo: PhotoInterface) {
    return this.http.post(`${this.common.getUrl()}patients/photo`, photo, {
      headers: this.auth.getHeaders(),
    });
  }

  getPatientConsentByPatient(idPatient: number) {
    return this.http.get(
      `${this.common.getUrl()}patientconsents/bypatient/${idPatient}`,
      { headers: this.auth.getHeaders() }
    );
  }
  getProfileOption(idProfile: number) {
    return this.http.get(
      `${this.common.getUrl()}profileoptions/getoptions/${idProfile}`,
      { headers: this.auth.getHeaders() }
    );
  }
}
