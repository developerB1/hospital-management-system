import { Component, ElementRef, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../Services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;

  departmentList: Department[] = [];
  dpService = inject(DepartmentService);

  departmentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getDepartments();
  }

  openModal() {
    const dpModal = document.getElementById('myModal');
    if (dpModal != null) {
      
      dpModal.style.display = 'block';

    }
  }
  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none'; 
    }
    
  }

  getDepartments() {
  this.dpService.getAllDepartments().subscribe((res) => {
      this.departmentList = res;
    })
  }
  setFormState() {
    this.departmentForm = this.fb.group({
      id: [0],
      departmentname: ['', [Validators.required]],
      departmentnumber: ['', [Validators.required]]
    });
  }

  formValues: any;
  onSubmit() {
    console.log(this.departmentForm.value);

    if (!this.departmentForm.valid) {
      alert('Please fill all Fields')
      return;
    }
    if (this.departmentForm.value.id == 0) {
      this.formValues = this.departmentForm.value;
      this.dpService.addDepartment(this.formValues).subscribe((res) => {
        alert('Deparment added successfully');
        this.getDepartments();
        this.departmentForm.reset();
        this.closeModal();
  
      });
    } else {
      this.formValues = this.departmentForm.value;
      this.dpService.updateDepartment(this.formValues).subscribe((res) => {
        alert('Department updated successfully');
        this.getDepartments();
        this.departmentForm.reset();
        this.closeModal();
  
      });
    }

  }

  onEdit(Deparment: Department) {
    this.openModal();
    this.departmentForm.patchValue(Deparment);
  }

  onDelete(department: Department) {
    const isConfirm = confirm("Are you sure you want to delete this Department " + department.departmentName + "?");
    if (isConfirm) {
      this.dpService.deleteDepartment(department.id).subscribe((res) => {
  
        alert("Department deleted successfully");
        this.getDepartments();
  
      });
    }
  }



}
