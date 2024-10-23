import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    userName: "",
    password: ""
  };

  router = inject(Router)
  onLogin() {
    if (this.loginObj.userName === "admin" && this.loginObj.password === "password123") {
      this.router.navigateByUrl("/dashboard")
    } else {
      alert("Wrong login/password")
    }
  }
}
