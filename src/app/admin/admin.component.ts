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
  // passBlock = true;
  passBlock = false; //Keep as false for testing
  userErr = "";
  passErr = "";
  displayLoginError: boolean = false;
  eventCodeInput: string = "";

  eventData;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor() { }

  ngOnInit() {

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

    // if (userValid == true && passValid == true){
    //   this.passBlock = false;
    // } else {
    //   this.displayLoginError = true;
    // }
  }

  modalCancel() {
    this.displayLoginError = false;
    this.userName = "";
    this.password = "";
  }

  getEventData() {
    let eventCode = this.eventCodeInput;
    if (eventCode != "") {
      eventCode = eventCode.replace('-', '').replace(' ', '');
      this.fireGetAPI(eventCode);
    }
  }

  fireGetAPI(eventCode: string) {
    let url = "https://nnt9lmwi2k.execute-api.us-east-1.amazonaws.com/GetComplete/fordeventdata/" + eventCode;

    try {
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.eventData = json;
        })
        .catch(error => console.error('error:', error));
    } catch (err) {
      console.log(err);
    }
  }

  // generateTextFile() {
  //   let blob = new Blob([this.eventData], { type: 'text/plain' })
  //   window.URL.createObjectURL(blob);

  //   var fileText = "I am the first part of the info being emailed.\r\nI am the second part.\r\nI am the third part.";
  //   var fileName = "newfile001.txt"
  //   // saveTextAsFile(fileText, fileName);
  // }
  // generateTxt(passForm) {
  //   // let text = "Test";
  //   // let textFile = null;
  //   // var data = new Blob([text], { type: 'text/plain' });
  //   // // If we are replacing a previously generated file we need to
  //   // // manually revoke the object URL to avoid memory leaks.
  //   // // if (textFile !== null) {
  //   // //   window.URL.revokeObjectURL(textFile);
  //   // // }
  //   // textFile = window.URL.createObjectURL(data);
  //   // return textFile;
  // };

  dynamicDownloadTxt() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'My Report',
      text: JSON.stringify(this.eventData)
    });
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




}
