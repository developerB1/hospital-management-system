import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Nurse } from '../Models/nurse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private apiUrl='https://localhost:7069/Nurse'
  constructor() { }

  http = inject(HttpClient)

  getAllNurses() {
    return this.http.get<Nurse[]>(this.apiUrl)
  }

  addNurse(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updateNurse(nurse: Nurse) {
    return this.http.put(`${this.apiUrl}/${nurse.id}`, nurse)
  }
  deleteNurse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getNurseCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }

}
