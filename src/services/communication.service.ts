import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  constructor(private http: HttpClient) {}

  registerUser(request: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/register`, request);
  }

  login(request: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/login`, {
      params: request,
    });
  }

  createForm(formId: string, userId: any) {
    return this.http.post(`${environment.apiUrl}/forms/createForm`, {
      formId,
      userId,
    });
  }

  updateForm(formId: string, userId: any, dataToUpdate: any) {
    return this.http.put(`${environment.apiUrl}/forms/updateForm`, {
      formId,
      userId,
      dataToUpdate,
    });
  }

  getForm(formId: string) {
    return this.http.get(`${environment.apiUrl}/forms/getForm`, {
      params: { formId },
    });
  }

  submitResponse(formId: string, response: any) {
    return this.http.post(`${environment.apiUrl}/forms/response`, {
      formId,
      response,
    });
  }
}
