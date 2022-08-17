import { Component, OnInit } from '@angular/core';
import { Params, Router, Route, ParamMap, ActivatedRoute } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { PasswordService } from '../../services/password/password.service';
import { httpResponse } from '../../Utils/types/responseHttp';
const {VERIFY_PASSWORD_CHANGE}=tools.components.services;

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent implements OnInit {

  constructor(private param:ActivatedRoute,private password:PasswordService) { }
  message=""
  verified=false
  ngOnInit(): void {
    let password:any=this.password;
    const authorization = this.param.snapshot.params["authorization"];
    password[VERIFY_PASSWORD_CHANGE](authorization).subscribe(
      (res:httpResponse) => {
        this.message =res.message ;
        this.verified=true
      },
      (err:any) => {
        this.message = err.error.message.message || err.message;
      }
    );
  }

}
