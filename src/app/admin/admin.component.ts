import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSubmission } from '../models/event-submission';
import * as moment from 'moment';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, MatTable} from '@angular/material';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pass: string = "!mostFor1";
  password: string = "";
  user: string = "FormostEvents";
  userName: string = "";
  passBlock = true;
  // passBlock = false; //Keep as false for testing
  userErr = "";
  passErr = "";
  displayLoginError: boolean = false;
  eventCodeInput: string = "";

  eventData: EventSubmission[];
  eventRecord: EventSubmission;
  ts = ""; //Text String
  eventDataLoaded = false;
  eventDataCount;
  reportEmail = "";
  spaceCount: number = 0;

  displayedColumns = ['userID', 'firstName', 'lastName', 'city', 'state', 'carEntry1', 'carEntry2'];
  dataSource: MatTableDataSource<EventSubmission>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50];

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor() { }

  ngOnInit() {
    this.eventData = [];
    this.dataSource = new MatTableDataSource<EventSubmission>();
    this.dataSource.paginator = this.paginator;
  }

  login() {
    let userValid: boolean = false;
    let passValid: boolean = false;
    if (this.userName === this.user) {
      userValid = true;
      this.userErr = "";
    } else {
      userValid = false;
      this.userErr = "Incorrect UserName"
    }
    if (this.password === this.pass) {
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

  getEventData() {
    this.eventDataLoaded = false;
    let eventCode = this.eventCodeInput;
    if (eventCode != "") {
      eventCode = eventCode.replace('-', '').replace(' ', '');
      this.fireGetAPI(eventCode);
    }
  }

  fireGetAPI(eventCode: string) {
    let url = "https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/GetComplete/fordeventdata/" + eventCode;
    let rawData;
    this.eventData = [];

    try {
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          rawData = json;
        })
        .then(data => {
          rawData.forEach(e => {
            let f = new EventSubmission();
            f.userID = e.UserID;
            f.address2 = e.Address2;
            f.carEntry1 = e.CarEntry1;
            f.carEntry2 = e.CarEntry2;
            f.carEntry3 = e.CarEntry3;
            f.city = e.City;
            f.countryCode = e.CountryCode;
            f.email = e.Email;
            f.eventCode = this.convertEventCode(e.EventCode);
            f.eventLocation = e.EventLocation;
            f.firstName = e.FirstName;
            f.lastName = e.LastName;
            f.nextCarDate = e.NextCarDate;
            f.phone = e.Phone.toString();
            f.state = e.State;
            f.street = e.Street;
            f.submissionDate = e.SubmissionDate;
            f.vendorID = e.VendorID;
            f.zipcode = e.Zipcode;
            f.emailOptIn = e.EmailOptIn;
            this.eventData.push(f);
          })
          this.eventDataCount = (this.eventData.length).toString();
          while (this.eventDataCount.length < 10){
            this.eventDataCount = "0" + this.eventDataCount;
          }
          this.dataSource = new MatTableDataSource<EventSubmission>(this.eventData);
          this.dataSource.paginator = this.paginator;
          this.eventDataLoaded = true;
        })
        .catch(error => console.error('error:', error));
    } catch (err) {
      console.log(err);
    }
  }

  convertEventCode(ec: string) {
    let eventCode = ec.slice(0, 6) + "-" + ec.slice(6);
    return eventCode;
  }


  dynamicDownloadTxt() {
    this.createTextString();
    let fName = "Event_" + this.eventData[0].eventCode;

    this.dyanmicDownloadByHtmlTag({
      fileName: fName,
      text: this.ts
    });
    this.ts = "";
  }

  dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  createTextString() {
    this.createHeaderRecord();
    this.createFulfillmentRequestRecords();
    this.createFooterRecord();
  }

  createHeaderRecord() {
    this.spaceCount = 0;
    let currentDate = new Date();
    let date = this.convertDate(currentDate);
    this.ts = this.ts + 
      this.spaces("H", 1, 0) +
      this.spaces("0000000297", 20, 0) +
      this.spaces(date, 16, 0) +
      this.spaces("V2", 2, 0) +
      this.spaces("", 0, 48) +
      this.spaces(this.reportEmail, 80, 0) +
      this.spaces("", 0, 1054);
      console.log("Header Count: " + this.spaceCount);
      this.ts = this.ts + "\n"
  }

  createFooterRecord() {
    this.spaceCount = 0;
    let currentDate = new Date();
    let date = this.convertDate(currentDate);
    this.ts = this.ts +
      this.spaces("T", 1, 0) +
      this.spaces("0000000297", 20, 0) +
      this.spaces(date, 16, 0) +
      this.spaces("", 0, 50) +
      this.spaces(this.eventDataCount, 10, 0) +
      this.spaces("", 0, 1124)
      console.log("Footer Count: " + this.spaceCount);
  }

  createFulfillmentRequestRecords() {
    this.eventData.forEach(e => {
      this.spaceCount = 0;
      this.ts = this.ts + 
        this.spaces("FD", 3, 0) +
        this.spaces("I", 1, 0 )+
        this.spaces("", 0, 11) +
        this.spaces("", 0, 6) +
        this.spaces("", 0, 40) +
        this.spaces("", 0, 30) + //first name 
        // this.spaces(e.firstName, 30, 0) +
        this.spaces("", 0, 1) +
        this.spaces("", 0, 35) + //last name 
        // this.spaces(e.lastName, 35, 0) +
        this.spaces("", 0, 5) +
        this.spaces("", 0, 40) + //street
        // this.spaces(e.street, 40, 0) +
        this.spaces("", 0, 40) + //address 2
        // this.spaces(e.address2, 40, 0) +
        this.spaces("", 0, 40) + //city
        // this.spaces(e.city, 40, 0) +
        this.spaces("", 0, 2) + //state
        // this.spaces(e.state, 2, 0) +
        this.spaces("USA", 3, 0) + //countrycode
        // this.spaces(e.countryCode, 80, 0) +
        this.spaces(e.zipcode, 6, 0) +
        this.spaces("", 0, 4) +
        this.spaces("", 0, 10) +
        // this.spaces(e.phone, 10, 0) +
        this.spaces("", 0, 10) +
        this.spaces(e.email, 80, 0) +
        this.spaces((e.eventCode.slice(0, 6)), 10, 0) +
        this.spaces((e.eventCode.slice(7)), 3, 0) +
        this.spaces("", 0, 50) +
        this.spaces("", 0, 10) +
        this.spaces((this.convertDate(e.submissionDate)), 16, 0) +
        this.spaces("", 0, 17) +
        this.spaces("", 0, 6) +
        this.spaces(e.carEntry1, 15, 0) + //car entry 1
        // this.carSpaces(e.carEntry1, e.carEntry2, e.carEntry3) +
        this.spaces("2019", 4, 0) +
        this.spaces("P", 1, 0) +
        this.spaces("EN", 2, 0) +
        this.questionSpaces("1077", e.nextCarDate) +
        this.spaces("", 0, 24) +
        this.questionSpaces("0799", e.emailOptIn) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        this.spaces("", 0, 24) +
        "\n";
        console.log("Request Count: " + this.spaceCount);
    });
  }

  convertDate(date) {
    return moment(date).format('L');
  }

  //Instructions for spaces:
  //To make raw spaces: this.spaces("", 0, N) where N is number of spaces
  //To make filler spaces: this.spaces("string", N, 0) where N is the defined as the total spaces for that part of the record
  spaces(str: string, length: number, blankSpaces: number) {
    let s = " ";
    let spaces = "";
    let retStr = "";

    //If value is null
    if (str == "null") {
      retStr = s.repeat(length);
    } else {
      if (blankSpaces == 0) {
        let strLength = str.length;
        let diff = length - strLength;
        spaces = s.repeat(diff);
      } else {
        spaces = s.repeat(blankSpaces);
      }
      retStr = str + spaces;
    }
    this.spaceCount = retStr.length + this.spaceCount;
    return retStr
  }

  carSpaces(car1: string, car2: string, car3: string) {
    let str = "";
    let retStr = "";
    let carCount = 1;
    let tempCar1 = car1;
    let tempCar2 = "";
    let tempCar3 = "";
    if (car2 == "null"){
      tempCar2 = "";
    } else {
      tempCar2 = car2;
      carCount++;
    }
    if (car3 == "null"){
      tempCar3 = "";
    } else {
      tempCar3 = car3;
      carCount++;
    }

    if (carCount == 1){
      str = tempCar1;
      retStr = this.spaces(str, 15, 0);
    } else if (carCount == 2){
      str = tempCar1 + " " + tempCar2;
      retStr = this.spaces(str, 15, 0);
    } else {
      str = tempCar1 + " " + tempCar2 + " " + tempCar3;
      retStr = this.spaces(str, 15, 0);
    }

    return retStr;
  }

  questionSpaces(question: string, answer) {
    let str = question + answer;
    return this.spaces(str, 24, 0);
  }


}
