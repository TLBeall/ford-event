import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSubmission } from '../models/event-submission';
import * as moment from 'moment';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, MatTable } from '@angular/material';



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
  textFileData: EventSubmission[];
  eventRecord: EventSubmission;
  ts = ""; //Text String
  eventDataLoaded = false;
  eventDataCount;
  textDataCount: String;
  reportEmail = "";
  spaceCount: number = 0;
  errorCount = 0;
  errorArray = [];
  errorString = "";

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

    if (userValid == true && passValid == true) {
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
    let url = "https://wqbjr541sc.execute-api.us-east-1.amazonaws.com/dev/eventmultiusersubmission/" + eventCode;
    let rawData;
    this.eventData = [];
    this.textFileData = [];

    try {
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          rawData = json;
        })
        .then(data => {
          rawData.forEach(e => {
            let f = new EventSubmission();
            f.userID = e._id;
            f.address2 = e.address2;
            f.carEntry1 = e.carEntry1;
            f.carEntry2 = e.carEntry2;
            f.carEntry3 = e.carEntry3;
            f.city = e.city;
            f.countryCode = e.countryCode;
            f.email = e.email;
            f.eventCode = this.convertEventCode(e.eventCode.toString());
            f.eventLocation = e.eventLocation;
            f.firstName = e.firstName;
            f.lastName = e.lastName;
            f.nextCarDate = e.nextCarDate;
            f.phone = e.phone.toString();
            f.state = e.state;
            f.street = e.street;
            f.submissionDate = e.submissionDate;
            f.vendorID = e.vendorID.toString();
            f.zipcode = e.zipcode.toString();
            f.emailOptIn = e.emailOptIn;

            //SET NULLS
            if (f.phone == "0") {
              f.phone = "";
            }
            if (f.carEntry1 == "null") {
              f.carEntry1 = "";
            }
            if (f.carEntry2 == "null") {
              f.carEntry2 = "";
            }
            if (f.carEntry3 == "null") {
              f.carEntry3 = "";
            }
            this.eventData.push(f);
            this.textFileData.push(f);

            //SET ADDITIONAL ENTRIES FOR MULTI-CAR SELECTIONS
            //CAR 2
            if (f.carEntry2 != "") {
              let g = new EventSubmission();
              g.userID = e.userID;
              g.address2 = e.address2;
              g.carEntry1 = e.carEntry2;
              g.carEntry2 = "";
              g.carEntry3 = "";
              g.city = e.city;
              g.countryCode = e.countryCode;
              g.email = e.email;
              g.eventCode = this.convertEventCode(e.eventCode.toString());
              g.eventLocation = e.eventLocation;
              g.firstName = e.firstName;
              g.lastName = e.lastName;
              g.nextCarDate = e.nextCarDate;
              g.phone = e.phone.toString();
              g.state = e.state;
              g.street = e.street;
              g.submissionDate = e.submissionDate;
              g.vendorID = e.vendorID.toString();
              g.zipcode = e.zipcode.toString();
              g.emailOptIn = e.emailOptIn;

              //SET NULLS
              if (g.phone == "0") {
                g.phone = "";
              }
              this.textFileData.push(g);
            }

            //CAR 3
            if (f.carEntry3 != "") {
              let g = new EventSubmission();
              g.userID = e.userID;
              g.address2 = e.address2;
              g.carEntry1 = e.carEntry3;
              g.carEntry2 = "";
              g.carEntry3 = "";
              g.city = e.city;
              g.countryCode = e.countryCode;
              g.email = e.email;
              g.eventCode = this.convertEventCode(e.eventCode.toString());
              g.eventLocation = e.eventLocation;
              g.firstName = e.firstName;
              g.lastName = e.lastName;
              g.nextCarDate = e.nextCarDate;
              g.phone = e.phone.toString();
              g.state = e.state;
              g.street = e.street;
              g.submissionDate = e.submissionDate;
              g.vendorID = e.vendorID.toString();
              g.zipcode = e.zipcode.toString();
              g.emailOptIn = e.emailOptIn;

              //SET NULLS
              if (g.phone == "0") {
                g.phone = "";
              }
              this.textFileData.push(g);
            }
          })

          //SET COUNTERS FOR FRONT END AND FOR TEXT FILE
          this.eventDataCount = this.eventData.length;
          this.textDataCount = (this.textFileData.length).toString();
          while (this.textDataCount.length < 10) {
            this.textDataCount = "0" + this.textDataCount;
          }

          //LOAD TABLE WITH DATA
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
      this.spaces("H", 1) +
      this.spaces("0000000297", 20) +
      this.spaces(date, 16) +
      this.spaces("V2", 2) +
      this.spaces("", 48) +
      this.spaces(this.reportEmail, 80) +
      this.spaces("", 1054);
    console.log("Header Count: " + this.spaceCount);
    this.ts = this.ts + "\n"
  }

  createFooterRecord() {
    this.spaceCount = 0;
    let currentDate = new Date();
    let date = this.convertDate(currentDate);
    this.ts = this.ts +
      this.spaces("T", 1) +
      this.spaces("0000000297", 20) +
      this.spaces(date, 16) +
      this.spaces("", 50) +
      this.spaces(this.textDataCount, 10) +
      this.spaces("", 1124)
    console.log("Footer Count: " + this.spaceCount);
    this.ts = this.ts + "\n"
  }

  createFulfillmentRequestRecords() {
    this.textFileData.forEach((e, index) => {
      try {
      this.spaceCount = 0;
      this.ts = this.ts +
        this.spaces("FD", 3) +
        this.spaces("I", 1) +
        this.spaces("", 11) +
        this.spaces("", 6) +
        this.spaces("", 40) +
        this.spaces(e.firstName, 30) +
        this.spaces("", 1) +
        this.spaces(e.lastName, 35) +
        this.spaces("", 5) +
        this.spaces(e.street, 40) +
        this.spaces(e.address2, 40) +
        this.spaces(e.city, 40) +
        this.spaces(e.state, 2) +
        this.spaces("USA", 3) + //countrycode
        this.spaces(e.zipcode, 6) +
        this.spaces("", 4) +
        this.spaces(e.phone, 10) +
        this.spaces("", 10) +
        this.spaces(e.email, 80) +
        this.spaces((e.eventCode.slice(0, 6)), 10) +
        this.spaces((e.eventCode.slice(7)), 3) +
        this.spaces("", 50) +
        this.spaces("", 10) +
        this.spaces((this.convertDate(e.submissionDate)), 16) +
        this.spaces("", 17) +
        this.spaces("", 6) +
        this.spaces(e.carEntry1, 15) + //car entry 1
        this.spaces("2019", 4) +
        this.spaces("P", 1) +
        this.spaces("EN", 2) +
        this.questionSpaces("1077", e.nextCarDate) +
        this.questionSpaces("0799", e.emailOptIn) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        this.spaces("", 24) +
        "\n";
      //console.log("Request Count: " + this.spaceCount);
      } catch (err) {
        this.errorCount += 1;
        let errorObj = JSON.stringify(e);
        this.errorString = this.errorString + "ERROR AT INDEX --- " + index + "\n";
        this.errorString = this.errorString + "ERROR OBJECT:" + "\n";
        this.errorString = this.errorString + errorObj + "\n";
        this.errorString = this.errorString + "\n";
        console.log("ERROR AT INDEX: " + index);
        console.log("ERROR OBJECT: " + errorObj);
      }
    });
  }



  dynamicDownloadTxt() {
    this.createTextString();
    let fName = "Event_" + this.eventData[0].eventCode;

    this.dyanmicDownloadByHtmlTag({
      fileName: fName,
      text: this.ts
    });
    this.ts = "";

    if (this.errorCount > 0){
      this.generateErrorFile();
    }
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

  generateErrorFile(){
    let fName =  "Error_File_" + this.eventData[0].eventCode;

    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(this.errorString)}`);
    element.setAttribute('download', fName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
    this.errorString = "";
  }

  convertDate(date) {
    return moment(date).format('L');
  }

  spaces(str: String, length: number) {
    let s = " ";
    let spaces = "";
    let retStr = "";

    //If value is null
    if (str == "null") {
      retStr = s.repeat(length);
    } else {
      let diff = length - str.length;
      retStr = str + s.repeat(diff);
    }
    this.spaceCount = retStr.length + this.spaceCount;
    return retStr
  }

  questionSpaces(question: string, answer) {
    if (answer.trim() == "") {
      let str = "";
      return this.spaces(str, 24);
    } else {
      let str = question + answer;
      return this.spaces(str, 24);
    }
  }


}
