import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, Validators, NgForm, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Input } from '@angular/compiler/src/core';


@Component({
  selector: 'app-homepage1',
  templateUrl: './homepage1.component.html',
  styleUrls: ['./homepage1.component.scss']
})
export class Homepage1Component implements OnInit {
  carList: string[] = ['2020 Explorer', 'C-MAX Hybrid', 'EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Fiesta', 'Flex', 'Focus', 'Focus Electric', 'Focus ST', 'Ford GT', 'Ford Performance Cars', 'Ford Performance Trucks', 'Fusion', 'Fusion Energi', 'Fusion Hubrid', 'Mustang', 'Ranger', 'Raptor', 'Super Duty(F-250)', 'Taurus', 'Transit', 'Transit Connect', 'Transit Connect Wagon'];
  states: string[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  signupForm: FormGroup;
  completedPopup = false;
  submissionMessage = "";
  carCountMessage = "Please Select a Vehicle of Interest";
  @ViewChild('f') myForm;

  constructor() { }

  ngOnInit() {
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
      'timeFrame': new FormControl("option5", Validators.required)
    });
  }

  carCount(control: FormControl): { [s: string]: boolean } {
    if (control.value != null) {
      if (control.value.length == 0) {
        this.carCountMessage = "Please Select a Vehicle of Interest";
        return { 'forbiddenCount': true };
      }
      if (control.value.length > 3) {
        this.carCountMessage = "Please Only Select 3 Vehicles";
        return { 'forbiddenCount': true };
      }
      return null;
    }
  }

  modalCancel() {
    this.completedPopup = false;
  }

  // testPhone(value){
  //   var phoneString = value.toString();
  //   var regex = '[0-9]+';
  //   var match = phoneString.match(regex);
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
      console.log(this.signupForm);
      //Replace '(' and ')' and '-' in phone number field
      let name: string = this.signupForm.value['firstName'];
      this.submissionMessage = "Thanks for your interest " + name + "!";
      this.completedPopup = true;
      setTimeout(() => {
        // this.signupForm.reset();
        this.myForm.resetForm();
        this.completedPopup = false;
        window.scroll(0,0);
      }, 4500)
    }
  }


  firePostAPI(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/Post1/fordeventdata');
    xhr.onreadystatechange = function(event){
      // console.log(event.returnValue);
      // console.log(event.target);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      location: "Hawaii",
      date: "2019-05-14",
      firstName: "Tyler",
      lastName: "Beall",
      street: "Wild Plum",
      address2: "Apt8",
      city: "Frederick",
      state: "MD",
      zipcode: 21703,
      phone: 3011111111,
      email: "test@gmail.com",
      carEntry1: "Ford",
      carEntry2: "Chevy",
      carEntry3: "Cool Car",
      nextCarDate: "3 months"
    }));
  }

  fireDeleteAPI(){
    var request = new XMLHttpRequest();
    request.open('POST', 'https://trz1r738ek.execute-api.us-east-1.amazonaws.com/2_1/secondtest');
    request.onreadystatechange = function(event){
      console.log(event.returnValue);
      console.log(event.target);
    }
    request.send();
  }

  fireGetAPI(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://trz1r738ek.execute-api.us-east-1.amazonaws.com/2_2/secondtest/all');
    request.onreadystatechange = function(event){
      console.log(event.returnValue);
      console.log(event.target);
    }
    request.send();
  }

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
//     var temp
//   }

//   modalCancel() {
//     this.completedPopup = false;
//   }

//   testPhone(value){
//     var phoneString = value.toString();
//     var regex = '[0-9]+';
//     var match = phoneString.match(regex);
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
//     // var tempName = firstName;
//     this.completedPopup = true;
//     var tes = this.cars;
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
