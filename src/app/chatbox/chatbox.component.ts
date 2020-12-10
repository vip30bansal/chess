import { ThrowStmt } from '@angular/compiler';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit, AfterViewInit, OnChanges, AfterViewChecked } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  // @ViewChild('chatBox') private chatBox: ElementRef;
  constructor() { }

  msgs = [
    { msg: "hii", type: "r" },
    { msg: "hello!!", type: "s" },
    { msg: "abcd", type: 'r' },
    { msg: "hello!!", type: "s" },
    { msg: "what's going on ??", type: 'r' },
    { msg: "hii", type: "r" },
    { msg: "hello!!", type: "s" },
    { msg: "what's going on ??", type: 'r' },
    { msg: "hii", type: "r" },
    { msg: "hello!!", type: "s" },
    { msg: "what's going on ??", type: 'r' }
  ];
  ngOnInit(): void {
    //this.scrollToBottom();
  }
  ngAfterViewInit(): void {
    //this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  sendMsg() {
    let value = $(document.getElementById('input')).val() + "";
    value = value.trim();
    if (value.length)
      this.msgs.push({ msg: value, type: 's' })
    $(document.getElementById('input')).val("");
    $(document.getElementById('input')).focus();
  }
  recvMsg() {
    let value = $(document.getElementById('recv_input')).val() + "";
    value = value.trim();
    if (value.length)
      this.msgs.push({ msg: value, type: 'r' })
    $(document.getElementById('recv_input')).val("");
    $(document.getElementById('recv_input')).focus();
  }

  scrollToBottom(): void {
    let msgBox = (document.getElementById('chatBox'));
    if (msgBox.scrollHeight > 500)
      msgBox.scrollTop = msgBox.scrollHeight;
    // // try {
    //   console.log("chat:", this.chatBox);
    //   this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    // } catch (err) { console.log("err:", err); }
  }
  submit(event) {
    if (event.keyCode == 13)
      if (event.srcElement.id === 'input')
        this.sendMsg();
      else
        this.recvMsg();
  }
}