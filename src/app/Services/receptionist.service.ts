import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Receptionist } from '../Models/receptionist';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private apiUrl='https://localhost:7069/Receptionist'
  constructor() { }

  http = inject(HttpClient)

  getAllReceptionists() {
    return this.http.get<Receptionist[]>(this.apiUrl)
  }

  addReceptionist(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updateReceptionist(receptionist: Receptionist) {
    return this.http.put(`${this.apiUrl}/${receptionist.id}`, receptionist)
  }
  deleteReceptionist(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getReceptionistCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }

}
