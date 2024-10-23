import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nurse } from '../../Models/nurse';
import { NurseService } from '../../Services/nurse.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nurse.component.html',
  styleUrl: './nurse.component.css'
})
export class NurseComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  nurseList: Nurse[] = [];
  nrService = inject(NurseService);

  nurseForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getNurses();
  }

  openModal() {
    const nrModal = document.getElementById('myModal');
    if (nrModal != null) {
      
      nrModal.style.display = 'block';

    }
  }
  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none'; 
    }
    
  }

  getNurses() {
    this.nrService.getAllNurses().subscribe((res) => {
      
      this.nurseList = res;

    })
  }
  setFormState() {
    this.nurseForm = this.fb.group({
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
    console.log(this.nurseForm.value);
    if (this.nurseForm.invalid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.nurseForm.value.id == 0) {
      this.formValues = this.nurseForm.value;
      this.nrService.addNurse(this.formValues).subscribe((res) => {
        alert('Nurse added successfully');
        this.getNurses();
        this.nurseForm.reset();
        this.closeModal();
  
      });
    } else {
      this.formValues = this.nurseForm.value;
      this.nrService.updateNurse(this.formValues).subscribe((res) => {
        alert('Patient updated successfully');
        this.getNurses();
        this.nurseForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Nurse: Nurse) {
    this.openModal();
    this.nurseForm.patchValue(Nurse);
  }

  onDelete(nurse: Nurse) {
    const isConfirm = confirm("Are you sure you want to delete this Patient " + nurse.name + "?");
    if (isConfirm) {
      this.nrService.deleteNurse(nurse.id).subscribe((res) => {
  
        alert("Nurse deleted successfully");
        this.getNurses();
  
      });
    }
  }



}
