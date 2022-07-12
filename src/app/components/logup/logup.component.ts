import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import tools from '../../Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
const { map_mesage_error, map_errors, welcome } = tools.components.logup;
const { card_absolute_error, card_absolute_success ,services} = tools.components;
const {LOGUP}=services;

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css'],
})
export class LogupComponent implements OnInit {
  form!: FormGroup;
  class_result: string = card_absolute_error;
  message!: string;
  success: string = '';
  map_errors: any = map_errors;
  map_mesage_error: any = map_mesage_error;

  constructor(private builder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.form.valueChanges.subscribe(() => this.validation());
  }

  validation() {
    if (!this.form) return;
    this.message = '';
    for (const key in this.map_errors) {
      if (!this.map_errors.hasOwnProperty(key)) return;
      const field = this.form.get(key);
      if (!field || !field.dirty || !field.invalid) return;
      for (const error in field.errors) {
        if (!field.errors.hasOwnProperty(error)) return;
        this.map_errors[key] = this.map_mesage_error[key][error];
      }
    }
  }

  sendUser() {
    let auth:any=this.auth;
    if (this.form.valid) {
       auth[LOGUP](this.form.value).subscribe(
        (res:httpResponse) => {
          this.class_result = card_absolute_success;
          this.success = welcome(this.form.value.name, this.form.value.email);
          this.form.reset();
        },
        (err:any) => {
          this.message = err.error.message.text;
          this.class_result = card_absolute_error;
        }
      );
    }
  }
}
