import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pathologist } from '../../Models/pathologist';
import { PathologistService } from '../../Services/pathologist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pathologist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pathologist.component.html',
  styleUrl: './pathologist.component.css'
})
export class PathologistComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  pathologistList: Pathologist[] = [];
  phService = inject(PathologistService);

  pathologistForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getPathologists();
  }

  openModal() {
    const phModal = document.getElementById('myModal');
    if (phModal != null) {
      
      phModal.style.display = 'block';

    }
  }
  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none'; 
    }
    
  }

  getPathologists() {
    this.phService.getAllPathologists().subscribe((res) => {
      
      this.pathologistList = res;

    })
  }
  setFormState() {
    this.pathologistForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      status: [false, [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    console.log(this.pathologistForm.value);
    if (this.pathologistForm.invalid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.pathologistForm.value.id == 0) {
      this.formValues = this.pathologistForm.value;
      this.phService.addPathologist(this.formValues).subscribe((res) => {
        alert('Pathologist added successfully');
        this.getPathologists();
        this.pathologistForm.reset();
        this.closeModal();
  
      });
    } else {
      this.formValues = this.pathologistForm.value;
      this.phService.updatePathologist(this.formValues).subscribe((res) => {
        alert('Pathologist updated successfully');
        this.getPathologists();
        this.pathologistForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Pathologist: Pathologist) {
    this.openModal();
    this.pathologistForm.patchValue(Pathologist);
  }

  onDelete(pathologist: Pathologist) {
    const isConfirm = confirm("Are you sure you want to delete this Pathologist " + pathologist.name + "?");
    if (isConfirm) {
      this.phService.deletePathologist(pathologist.id).subscribe((res) => {
  
        alert("Pathologist deleted successfully");
        this.getPathologists();
  
      });
    }
  }



}
