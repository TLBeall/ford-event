import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, Validators, NgForm, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Input } from '@angular/compiler/src/core';
import { CarList } from '../models/car-list';
import { StateList } from '../models/state-list';
import { EventSubmission } from '../models/event-submission';
import * as moment from 'moment';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-submission-form1',
  templateUrl: './submission-form1.component.html',
  styleUrls: ['./submission-form1.component.scss']
})
export class SubmissionForm1Component implements OnInit {
  eventData: EventSubmission;
  carList: CarList;
  stateList: StateList;

  signupForm: FormGroup;
  completedPopup = false;
  submissionMessage = "";
  carCountMessage = "Please Select a Vehicle of Interest";
  checked = false;
  mustBeCheckedError = false;
  @ViewChild('f') myForm;
  @ViewChild('cb') myCheckbox: MatCheckbox;

  constructor() { }

  ngOnInit() {
    let currentDate = new Date();
    this.carList = new CarList();
    this.stateList = new StateList();

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),
      'apt': new FormControl(null),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'zipcode': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('^\\(?[0-9]{3}\\)?-?\\.?[0-9]{3}-?\\.?[0-9]{4}$')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'age': new FormControl(null),
      'cars': new FormControl(null, [Validators.required, this.carCount.bind(this)]),
      'timeFrame': new FormControl("E", Validators.required),
      'checkBox': new FormControl(false, Validators.requiredTrue)
    });

    this.eventData = new EventSubmission();
    this.eventData.eventLocation = 'Roanoke';
    this.eventData.eventCode = '501076001';
    this.eventData.vendorID = '501076';
    this.eventData.submissionDate = moment(currentDate).format('YYYY-MM-DD');
    this.eventData.firstName = "";
    this.eventData.lastName = "";
    this.eventData.street = "";
    this.eventData.address2 = "";
    this.eventData.city = "";
    this.eventData.state = "";
    this.eventData.countryCode = "USA";
    this.eventData.zipcode = null;
    this.eventData.phone = null;
    this.eventData.email = "";
    this.eventData.carEntry1 = "";
    this.eventData.carEntry2 = "";
    this.eventData.carEntry3 = "";
    this.eventData.nextCarDate = "";
  }

  carCount(control: FormControl): { [s: string]: boolean } {
    if (control.value != null) {
      if (control.value.length == 0) {
        this.carCountMessage = "Please Select a Vehicle of Interest";
        return { 'forbiddenCount': true };
      }
      if (control.value.length > 3) {
        this.carCountMessage = "Please Only Select up to 2 Vehicles";
        return { 'forbiddenCount': true };
      }
      return null;
    }
  }


  modalCancel() {
    this.myForm.resetForm();
    this.completedPopup = false;
    window.scroll(0, 0);
  }

  // testPhone(value){
  //   let phoneString = value.toString();
  //   let regex = '[0-9]+';
  //   let match = phoneString.match(regex);
  //   if (match.length == 10){
  //     this.phone.number = parseInt(match);
  //     this.phone.invalid = false;
  //     this.phone.errorMessage = '';
  //   } else {
  //     this.phone.invalid = true;
  //     this.phone.errorMessage = 'Please Enter a Valid Phone Number';
  //   }
  // }

  submitForm() {
    if (this.signupForm.valid == true) {
      this.eventData.firstName = this.signupForm.value['firstName'];
      this.eventData.lastName = this.signupForm.value['lastName'];
      this.eventData.street = this.signupForm.value['street'];
      try {
        this.eventData.address2 = (this.signupForm.value['apt']).toString();
      } catch (error) {
        this.eventData.address2 = "";
      }
      this.eventData.city = this.signupForm.value['city'];
      this.eventData.state = this.signupForm.value['state'].name;
      try {
        this.eventData.zipcode = (this.signupForm.value['zipcode']).toString();
      } catch (error) {
        this.eventData.zipcode = "";
      }
      try {
        this.eventData.phone = (this.signupForm.value['phone']).toString();
        let alts = ['-', '.', ' ', '(', ')'];
        alts.forEach(element => {
          this.eventData.phone = this.eventData.phone.replace(element, '');
        });
      } catch (error) {
        this.eventData.phone = "";
      }
      this.eventData.email = this.signupForm.value['email'];
      let carArr = this.signupForm.value['cars'];
      if (carArr.length == 1) {
        this.eventData.carEntry1 = carArr[0].code;
        this.eventData.carEntry2 = "";
        this.eventData.carEntry3 = "";
      } else if (carArr.length == 2) {
        this.eventData.carEntry1 = carArr[0].code;
        this.eventData.carEntry2 = carArr[1].code;
        this.eventData.carEntry3 = "";
      }
      else if (carArr.length == 3) {
        this.eventData.carEntry1 = carArr[0].code;
        this.eventData.carEntry2 = carArr[1].code;
        this.eventData.carEntry3 = carArr[2].code;
      }
      this.eventData.nextCarDate = this.signupForm.value['timeFrame'];
      this.firePostAPI();
    }
  }


  firePostAPI() {
    fetch('https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/Post1/fordeventdata', {
      method: 'POST',
      body: JSON.stringify({
        eventLocation: "" + this.eventData.eventLocation,
        eventCode: "" + this.eventData.eventCode,
        vendorID: "" + this.eventData.vendorID,
        submissionDate: "" + this.eventData.submissionDate,
        firstName: "" + this.eventData.firstName,
        lastName: "" + this.eventData.lastName,
        street: "" + this.eventData.street,
        address2: "" + this.eventData.address2,
        city: "" + this.eventData.city,
        state: "" + this.eventData.state,
        zipcode: "" + this.eventData.zipcode,
        countryCode: "" + this.eventData.countryCode,
        phone: "" + this.eventData.phone,
        email: "" + this.eventData.email,
        carEntry1: "" + this.eventData.carEntry1,
        carEntry2: "" + this.eventData.carEntry2,
        carEntry3: "" + this.eventData.carEntry3,
        nextCarDate: "" + this.eventData.nextCarDate
      }),
      headers: { 'Content-type': 'application/json' }
    })
      .catch(error => console.error('error:', error));



    // console.log(this.signupForm);
    //Replace '(' and ')' and '-' in phone number field
    let name: string = this.signupForm.value['firstName'];
    this.submissionMessage = "Thanks for your interest " + name + "!";
    this.completedPopup = true;

    // setTimeout(() => {
    //   this.myForm.resetForm();
    //   this.completedPopup = false;
    //   window.scroll(0, 0);
    // }, 4500)
  }

  fireDeleteAPI() {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://trz1r738ek.execute-api.us-east-1.amazonaws.com/2_1/secondtest');
    request.onreadystatechange = function (event) {
      console.log(event.returnValue);
      console.log(event.target);
    }
    request.send();
  }

  // fireGetAPI() {
  //   let request = new XMLHttpRequest();
  //   let HTTPReponse;
  //   let data;
  //   let url = "https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/GetComplete/fordeventdata/" + this.eventData.eventCode;
  //   request.open('GET', url);
  //   request.onreadystatechange = function (event) {
  //     // console.log(event.returnValue);
  //     // console.log(event.target);
  //     HTTPReponse = event.target;
  //     data = HTTPReponse.response;
  //   }
  //   request.setRequestHeader('Content-Type', 'application/json');
  //   request.send();
  // }

  // fireGetAPI() {
  //   let url = "https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/GetComplete/fordeventdata/" + this.eventData.eventCode;

  //   fetch(url,{ method: 'GET' })
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.error('error:', error));
  // }
}
























// export class Homepage1Component implements OnInit {
//   // emailControl = new FormControl('', [Validators.required, Validators.email]);
//   // phoneControl = new FormControl('', Validators.required);
//   stateControl = new FormControl('', Validators.required);
//   cars = new FormControl();
//   carList: string[] = ['2020 Explorer', 'C-MAX Hybrid', 'EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Fiesta', 'Flex', 'Focus', 'Focus Electric', 'Focus ST', 'Ford GT', 'Ford Performance Cars', 'Ford Performance Trucks', 'Fusion', 'Fusion Energi', 'Fusion Hubrid', 'Mustang', 'Ranger', 'Raptor', 'Super Duty(F-250)', 'Taurus', 'Transit', 'Transit Connect', 'Transit Connect Wagon'];
//   states: string[] = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
//   completedPopup = false;
//   theCars: string = "";
//   nameMessage: string = "";
//   // nameRow = false;
//   phone = {
//     number: 0,
//     invalid: false,
//     errorMessage: ''
//   };

// zip = "";

//   constructor() { }

//   ngOnInit() {

//   }

//   checkZip(){
//     let temp
//   }

//   modalCancel() {
//     this.completedPopup = false;
//   }

//   testPhone(value){
//     let phoneString = value.toString();
//     let regex = '[0-9]+';
//     let match = phoneString.match(regex);
//     if (match.length == 10){
//       this.phone.number = parseInt(match);
//       this.phone.invalid = false;
//       this.phone.errorMessage = '';
//     } else {
//       this.phone.invalid = true;
//       this.phone.errorMessage = 'Please Enter a Valid Phone Number';
//     }
//   }

//   submitForm(form: NgForm) {
//     console.log(form);
//     this.theCars = "";
//     // let tempName = firstName;
//     this.completedPopup = true;
//     let tes = this.cars;
//     // this.nameMessage = "Thanks for your interest " + firstName + "!";
//     // this.cars.value.forEach((e, index) => {
//     //   if (index == 0){
//     //     this.theCars = e;
//     //   } else if (index == this.cars.value.length-1) {
//     //     this.theCars = this.theCars + " and " + e;
//     //   } else {
//     //     this.theCars = this.theCars + ", " + e;
//     //   }
//     // });
//     // setTimeout(() => {
//     //   // this.router.navigate(['lri/new']);
//     //   this.completedPopup = false;
//     //   // this.resetFile();
//     //   // this.LRIArray = [];
//     //   // this.loadDefaultValues();
//     // }, 4500)
//   }

//   // getErrorMessage() {
//   //       return this.emailControl.hasError('required') ? 'You must enter a value' :
//   //       this.emailControl.hasError('email') ? 'Not a valid email' : '';
//   //     }

// }
