import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pass: string = "!mostFore1";
  password: string = "";
  user: string = "ForemostEvents";
  userName: string = "";
  passBlock = true;
  userErr = "";
  passErr = "";
  displayLoginError: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  login() {
    let userValid: boolean = false;
    let passValid: boolean = false;
    if (this.userName === this.user){
      userValid = true;
      this.userErr = "";
    } else {
      userValid = false;
      this.userErr = "Incorrect UserName"
    }
    if (this.password === this.pass){
      passValid = true;
      this.passErr = "";
    } else {
      passValid = false;
      this.passErr = "Incorrect Password";
    }

    if (userValid == true && passValid == true){
      this.passBlock = false;
    } else {
      this.displayLoginError = true;
    }
  }

  modalCancel() {
    this.displayLoginError = false;
    this.userName = "";
    this.password = "";
  }

}
