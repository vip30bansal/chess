import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { default as data } from 'src/assets/smsbackup.json';
import moment from 'moment';
@Component({
  selector: 'app-msgs',
  templateUrl: './msgs.component.html',
  styleUrls: ['./msgs.component.css']
})
export class MsgsComponent implements OnInit {
  allMsgs = [];
  constructor() { }
  loading = false;
  contacts: any = [];
  address: any;
  contact: any;
  showSave = false;
  ngOnInit(): void {
    console.log(data);
    for (let key in data) {
      this.contacts.push(data[key]);
    }
    this.sortData();
    console.log("contacts:", this.contacts);
  }
  sortData() {
    this.contacts.sort((a, b) => {
      return (b.last_msg) - (a.last_msg);
    });
  }
  findSms(contact) {
    this.contact = contact;
    console.log("add", contact);
    this.allMsgs = contact.sms;
  }

  deleteContact(event) {
    this.showSave = true;
    console.log(event);
    this.contacts.splice(event, 1);
  }
  deleteMsg(event) {
    this.showSave = true;
    console.log(event);
    this.contact.sms.splice(event, 1);
  }
  save() {
    let content = JSON.stringify(this.contacts);
    var a = document.createElement('a');
    var file = new Blob([content], { type: 'json' });
    a.href = URL.createObjectURL(file);
    let now = moment().format('YYYYMMDDHHmmss');
    console.log(now);
    a.download = now + ".json";
    a.click();
  }
}
