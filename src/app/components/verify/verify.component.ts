import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import tools from '../../Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
const { welcome } = tools.components.verify;
const { services} = tools.components;
const {VERIFY}=services;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  verified!: boolean;
  message!: string;
  error: boolean = false;
  constructor(private param: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    let auth:any=this.auth;
    const authorization = this.param.snapshot.params['authorization'];
    auth[VERIFY](authorization).subscribe(
      (res:httpResponse) => {
        this.verified = !res.error;
        this.message = res.message || welcome(res.data.name);
      },
      (err:any) => {
        this.verified = true;
        this.error = this.verified;
        this.message = err.error.message || err.message;
      }
    );
  }
}
