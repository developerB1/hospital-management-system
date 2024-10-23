import { Routes } from '@angular/router';
import { PatientComponent } from './Components/patient/patient.component';
import { PathologistComponent } from './Components/pathologist/pathologist.component';
import { DoctorComponent } from './Components/doctor/doctor.component';
import { ReceptionistComponent } from './Components/receptionist/receptionist.component';
import { NurseComponent } from './Components/nurse/nurse.component';
import { DepartmentComponent } from './Components/department/department.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';

export const routes: Routes = [
    {
        path: "", 
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login", component:LoginComponent
    },
    {
        path: "", component: LayoutComponent,
        children: [
            {
                path: "dashboard", component:DashboardComponent
            },
            {
                path: "patient", component: PatientComponent
            },
            {
                path: "pathologist", component: PathologistComponent
            },
            {
                path: "doctor", component: DoctorComponent
            },
            {
                path: "nurse", component: NurseComponent
            },
            {
                path: "receptionist", component: ReceptionistComponent
            },
            {
                path: "department", component: DepartmentComponent
            }        
        ]
    }
    
];
