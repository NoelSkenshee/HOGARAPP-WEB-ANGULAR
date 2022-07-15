import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import tools from '../../Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
const { message_error_field, mat_error_field } = tools.components.login, { card_absolute_error, card_absolute_success ,services,Authorization,routes} = tools.components,{LOGIN}=services;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  class_result: string = card_absolute_error;
  message!: string;
  success: string = '';
  mat_error_field: any = mat_error_field;
  message_error_field: any = message_error_field;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private nav: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => this.onFormChange());
  }

  onFormChange() {
    if (!this.form) return;
    this.message = '';
    for (const key in this.mat_error_field) {
      if (!this.mat_error_field.hasOwnProperty(key)) return;
      const field = this.form.get(key);
      if (field && field.dirty && field.invalid) {
        for (const error in field.errors) {
           this.mat_error_field[key] = this.message_error_field[key][error];
        }
      }
    }
  }

  login() {
    let auth:any=this.auth;
    if (this.form.valid) {
      auth[LOGIN](this.form.value).subscribe(
        (res:httpResponse) => {
           this.class_result = card_absolute_success;
           this.form.reset();
           localStorage.setItem(Authorization,res.data)
           this.nav.navigate([routes.dashboard])
        },
        (err:any) => {
           this.message = err.error.message.text || err.error.message;
           this.class_result = card_absolute_error;
        }
      );
    }
  }
}
