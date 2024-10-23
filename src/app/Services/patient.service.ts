import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../Models/patient';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl='https://localhost:7069/Patient'
  constructor() { }

  http = inject(HttpClient)

  getAllPatients() {
    return this.http.get<Patient[]>(this.apiUrl)
  }

  addPatient(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updatePatient(patient: Patient) {
    return this.http.put(`${this.apiUrl}/${patient.id}`, patient)
  }
  deletePatient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getPatientCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }
}
