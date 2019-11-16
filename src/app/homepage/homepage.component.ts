import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, Validators, NgForm, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Input } from '@angular/compiler/src/core';
import { CarList } from '../models/car-list';
import { StateList } from '../models/state-list';
import { Event } from '../models/event';
import { EventSubmission } from '../models/event-submission';
import * as moment from 'moment';
import { MatCheckbox } from '@angular/material';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  eventSelectedState: boolean = false;
  eventList: Event[] = [];

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

  constructor() {

  }

  ngOnInit() {
    this.eventList = [];
    this.fireGetAPI().then(() => {
      this.eventCountPageLoad();
    });


    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),
      'apt': new FormControl(null),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'zipcode': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      'phone': new FormControl(null, Validators.pattern('^\\(?[0-9]{3}\\)? ?-?\\.?[0-9]{3}-? ?\\.?[0-9]{4}$')),
      //'phone': new FormControl(null, [Validators.required, Validators.pattern('^\\(?[0-9]{3}\\)?-?\\.?[0-9]{3}-?\\.?[0-9]{4}$')]),
      'email': new FormControl(null, Validators.email),
      //'email': new FormControl(null, [Validators.required, Validators.email]),
      'age': new FormControl(null),
      'cars': new FormControl(null, [Validators.required, this.carCount.bind(this)]),
      'timeFrame': new FormControl("E", Validators.required),
      'emailOptIn': new FormControl(false)
    });
  }


  loadForm(event: Event) {
    let currentDate = new Date();
    this.carList = new CarList();
    this.stateList = new StateList();

    this.eventData = new EventSubmission();
    this.eventData.eventLocation = event.location;
    this.eventData.eventCode = event.eventCode.toString();
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
    this.eventData.emailOptIn = "";
    console.log(this.eventData.eventLocation);
    console.log(event);
    this.eventSelectedState = true;
  }

  eventCountPageLoad(){
    if (this.eventList.length == 0){

    } else if (this.eventList.length == 1){
      this.eventSelectedState = true;
      this.loadForm(this.eventList[0]);
    } else {
      this.eventSelectedState = false;
    }
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

  toggleState() {
    this.eventSelectedState = !this.eventSelectedState;
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
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
        this.eventData.phone = this.eventData.phone.replace(/\.|\(|\)| |-/g, '');
        if (this.eventData.phone == null || this.eventData.phone == "") {
          this.eventData.phone = "0";
        }
      } catch (error) {
        this.eventData.phone = "0";
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
      if (this.signupForm.value['emailOptIn'] == true) {
        this.eventData.emailOptIn = "A";
      } else {
        this.eventData.emailOptIn = " ";
      }
      this.firePostAPI();
    }
  }

  fireGetAPI() {
    let promise = new Promise((resolve, reject) => {

      let url = "https://execute-api.us-east-1.amazonaws.com/dev/events/get/active";
      let rawEventListData;

      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          data.forEach(e => {
            let f = new Event(
              e._id,
              e.name,
              e.eventCode,
              e.location,
              e.active,
              e.startDate,
              e.endDate,
              e.entryDate,
              e.modifyDate
            );
            this.eventList.push(f);
            resolve();
          })
        })            
        .catch(error => console.error('ERROR:', error));
    })
    return promise;
  }



  firePostAPI() {
    fetch('https://execute-api.us-east-1.amazonaws.com/dev/eventusersubmission', {
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
        nextCarDate: "" + this.eventData.nextCarDate,
        emailOptIn: "" + this.eventData.emailOptIn
      }),
      headers: { 'Content-type': 'application/json' }
    })
      .catch(error => console.error('error:', error));

    let name: string = this.signupForm.value['firstName'];
    this.submissionMessage = "Thanks for your interest " + name + "!";
    this.completedPopup = true;
  }

}
