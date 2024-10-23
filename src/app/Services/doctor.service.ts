import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Doctor } from '../Models/doctor';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl='https://localhost:7069/Doctor'
  constructor() { }

  http = inject(HttpClient)

  getAllDoctors() {
    return this.http.get<Doctor[]>(this.apiUrl)
  }

  addDoctor(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updateDoctor(doctor: Doctor) {
    return this.http.put(`${this.apiUrl}/${doctor.id}`, doctor)
  }
  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getDoctorCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }

}
