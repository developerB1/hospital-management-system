import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../Models/patient';
import { PatientService } from '../../Services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  patientList: Patient[] = [];
  ptService = inject(PatientService);

  patientForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getPatients();
  }

  openModal() {
    const ptModal = document.getElementById('myModal');
    if (ptModal != null) {
      
      ptModal.style.display = 'block';

    }
  }
  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none'; 
    }
    
  }

  getPatients() {
    this.ptService.getAllPatients().subscribe((res) => {
      
      this.patientList = res;

    })
  }
  setFormState() {
    this.patientForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    console.log(this.patientForm.value);
    console.log('Form invalid:', this.patientForm.errors);
    if (!this.patientForm.valid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.patientForm.value.id == 0) {
      this.formValues = this.patientForm.value;
      this.ptService.addPatient(this.formValues).subscribe((res) => {
        alert('Patient added successfully');
        this.getPatients();
        this.patientForm.reset();
        this.closeModal();
  
      }
      );
    } else {
      this.formValues = this.patientForm.value;
      this.ptService.updatePatient(this.formValues).subscribe((res) => {
        alert('Patient updated successfully');
        this.getPatients();
        this.patientForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Patient: Patient) {
    this.openModal();
    this.patientForm.patchValue(Patient);
  }

  onDelete(patient: Patient) {
    const isConfirm = confirm("Are you sure you want to delete this Patient " + patient.name + "?");
    if (isConfirm) {
      this.ptService.deletePatient(patient.id).subscribe((res) => {
  
        alert("Patient deleted successfully");
        this.getPatients();
  
      });
    }
  }



}
