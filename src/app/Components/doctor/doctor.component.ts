import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor } from '../../Models/doctor';
import { DoctorService } from '../../Services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  doctorList: Doctor[] = [];
  drService = inject(DoctorService);

  doctorForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getDoctors();
  }

  openModal() {
    const drModal = document.getElementById('myModal');
    if (drModal != null) {
      
      drModal.style.display = 'block';

    }
  }
  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none'; 
    }
    
  }

  getDoctors() {
    this.drService.getAllDoctors().subscribe((res) => {
      
      this.doctorList = res;

    })
  }
  setFormState() {
    this.doctorForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  formValues: any;
  onSubmit() {
    console.log(this.doctorForm.value);
    if (this.doctorForm.invalid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.doctorForm.value.id == 0) {
      this.formValues = this.doctorForm.value;
      this.drService.addDoctor(this.formValues).subscribe((res) => {
        alert('Doctor added successfully');
        this.getDoctors();
        this.doctorForm.reset();
        this.closeModal();
  
      });
    } else {
      this.formValues = this.doctorForm.value;
      this.drService.updateDoctor(this.formValues).subscribe((res) => {
        alert('Patient updated successfully');
        this.getDoctors();
        this.doctorForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Doctor: Doctor) {
    this.openModal();
    this.doctorForm.patchValue(Doctor);
  }

  onDelete(doctor: Doctor) {
    const isConfirm = confirm("Are you sure you want to delete this Patient " + doctor.name + "?");
    if (isConfirm) {
      this.drService.deleteDoctor(doctor.id).subscribe((res) => {
  
        alert("Doctor deleted successfully");
        this.getDoctors();
  
      });
    }
  }



}
