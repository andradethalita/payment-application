import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  loginError: boolean = false;
  loginAttempt: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm.addControl('showPassword', this.fb.control(false));
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginAttempt = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(email, password).subscribe((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/payments-dashboard']);
        } else {
          this.loginError = true;
        }
      });
    }
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (
      !!control && control.invalid && (control.touched || this.loginAttempt)
    );
  }
}
