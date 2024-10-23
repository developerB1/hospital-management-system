import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pathologist } from '../Models/pathologist';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathologistService {
  private apiUrl='https://localhost:7069/Pathologist'
  constructor() { }

  http = inject(HttpClient)

  getAllPathologists() {
    return this.http.get<Pathologist[]>(this.apiUrl)
  }

  addPathologist(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updatePathologist(pathologist: Pathologist) {
    return this.http.put(`${this.apiUrl}/${pathologist.id}`, pathologist)
  }
  deletePathologist(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getPathologistCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }

}
