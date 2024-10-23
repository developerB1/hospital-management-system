import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Receptionist } from '../../Models/receptionist';
import { ReceptionistService } from '../../Services/receptionist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receptionist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './receptionist.component.html',
  styleUrl: './receptionist.component.css'
})
export class ReceptionistComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  receptionistList: Receptionist[] = [];
  rtService = inject(ReceptionistService);

  receptionistForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getReceptionists();
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

  getReceptionists() {
    this.rtService.getAllReceptionists().subscribe((res) => {
      
      this.receptionistList = res;

    })
  }
  setFormState() {
    this.receptionistForm = this.fb.group({
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
    console.log(this.receptionistForm.value);
    if (!this.receptionistForm.valid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.receptionistForm.value.id == 0) {
      this.formValues = this.receptionistForm.value;
      this.rtService.addReceptionist(this.formValues).subscribe((res) => {
        alert('Receptionist added successfully');
        this.getReceptionists();
        this.receptionistForm.reset();
        this.closeModal();
  
      }
      );
    } else {
      this.formValues = this.receptionistForm.value;
      this.rtService.updateReceptionist(this.formValues).subscribe((res) => {
        alert('Receptionist updated successfully');
        this.getReceptionists();
        this.receptionistForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Receptionist: Receptionist) {
    this.openModal();
    this.receptionistForm.patchValue(Receptionist);
  }

  onDelete(receptionist: Receptionist) {
    const isConfirm = confirm("Are you sure you want to delete this Receptionist " + receptionist.name + "?");
    if (isConfirm) {
      this.rtService.deleteReceptionist(receptionist.id).subscribe((res) => {
  
        alert("Receptionist deleted successfully");
        this.getReceptionists();
  
      });
    }
  }



}
