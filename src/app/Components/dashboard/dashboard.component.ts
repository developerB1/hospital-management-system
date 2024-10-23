import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../Services/patient.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../Services/doctor.service';
import { NurseService } from '../../Services/nurse.service';
import { DepartmentService } from '../../Services/department.service';
import { PathologistService } from '../../Services/pathologist.service';
import { ReceptionistService } from '../../Services/receptionist.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  patientsCount: number = 0;
  doctorsCount: number = 0;
  nursesCount: number = 0;
  departmentsCount: number = 0;
  pathologistsCount: number = 0;
  receptionistsCount: number = 0;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private nurseService: NurseService,
    private departmentService: DepartmentService,
    private pathologistService: PathologistService,
    private receptionistService: ReceptionistService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.patientService.getPatientCount().subscribe(count => {
      this.patientsCount = count;
    });

    this.doctorService.getDoctorCount().subscribe(count => {
      this.doctorsCount = count;
    });

    this.nurseService.getNurseCount().subscribe(count => {
      this.nursesCount = count;
    });

    this.departmentService.getDepartmentCount().subscribe(count => {
      this.departmentsCount = count;
    });

    this.pathologistService.getPathologistCount().subscribe(count => {
      this.pathologistsCount = count;
    });

    this.receptionistService.getReceptionistCount().subscribe(count => {
      this.receptionistsCount = count;
    });

  }
}