import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Department } from '../Models/department';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl='https://localhost:7069/Department'
  constructor() { }

  http = inject(HttpClient)

  getAllDepartments() {
    return this.http.get<Department[]>(this.apiUrl)
  }

  addDepartment(data: any) {
    
    return this.http.post(this.apiUrl, data);
  }
  updateDepartment(department: Department) {
    return this.http.put(`${this.apiUrl}/${department.id}`, department)
  }
  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getDepartmentCount(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(response => response.length)  // Hier wird die Länge des Arrays zurückgegeben
    );
  }

}
