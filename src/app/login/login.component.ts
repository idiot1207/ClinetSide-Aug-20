import { Component, OnInit } from '@angular/core';
import { LoginModal } from '../modals/login.modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpParameterCodec } from '@angular/common/http';
import { TeamnameService } from '../Service/teamname.service';
import { formatDate } from '@angular/common';
import { error } from 'util';
// import {Base64 } from 'js-base64';
// import  'bower_components/angular-base64'
// import  'angular-base64/angular-base64';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  key = CryptoJS.enc.Utf8.parse('8080808080808080');
  iv = CryptoJS.enc.Utf8.parse('8080808080808080');
  encryptedusername;
  encryptedpassword;
  encryptMode: boolean;
  // encryptMode1: boolean;
  textToConvert: string;
  conversionEmail: string;
  conversionPassword: string;
  submitted = false;
  showErrorMessage = false;
  user: LoginModal = new LoginModal();
  loginForm: FormGroup;
  hide: true;
  areapath;
  loggedInTime: any;
  public accessGuardValue = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private teamservice: TeamnameService) {
    this.encryptMode = true;
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, [
        Validators.required
      ]],
      password: [this.user.password, [
        Validators.required
      ]]
    });
  }
  get f() { return this.loginForm.controls; }
  convertEncryptEmail() {
    this.encryptedusername = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.user.email), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    // console.log(this.encryptedusername);
    this.encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.user.password), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    this.areapath = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('ProjectOne\\TeamName\\IDW Ekonomiskt bistånd rapport'), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    if (this.encryptMode) {
      this.conversionEmail = CryptoJS.AES.encrypt(this.user.email.trim(), this.user.password.trim()).toString();
      // console.log('Email is ' + this.conversionEmail);
    }
  }
  convertEncryptPassword() {
    if (this.user.password) {
      this.conversionPassword = CryptoJS.AES.encrypt(this.user.password.trim(), this.user.password.trim()).toString();
      // console.log('Password is ' + this.conversionPassword);
    }
  }
  editReset() {
    this.user.email = ``;
    this.user.password = ``;
  }
  onLoginSubmit(data: LoginModal): any {
    this.submitted = true;
    this.loggedInTime = new Date();
    this.loggedInTime = formatDate(this.loggedInTime, 'MM/dd/yyyy hh:mm:ss', 'en-US');
    this.teamservice.isLoggedIn = true;
    this.teamservice.getToken(this.encryptedusername, this.encryptedpassword)
      .subscribe(
        (res: any) => {
          localStorage.setItem('accessToken', res.access_token);
          localStorage.setItem('userName', this.user.email);
          localStorage.setItem('loggedInTime', this.loggedInTime);
          if (res.hasOwnProperty('access_token')) {
            // this.teamservice.routerGuardReturnValue = true;
            this.router.navigate(['/outputData']);
          }
        },
        // err => console.log(err)
        (err) => {
          this.showErrorMessage = true;
        }
      );
  }
}
export class CustomURLEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(key: string): string {
    return encodeURIComponent(key);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(key: string) {
    return decodeURIComponent(key);
  }
}
