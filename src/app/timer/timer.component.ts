import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  time = 300;
  value = '05';
  constructor() { }

  notStarted = "true";
  ngOnInit(): void {
  }
  handleEvent(event: any) {
    console.log("event:", event);
  }
  timeChanged(event) {

    console.log("event", event);
    this.time = event.target.value * 60;
    if (event.target.value < 10 && event.target.value > 3)
      event.target.value = '0' + event.target.value;
    else if (event.target.value == 3)
      event.target.value = '03';
    else if (event.target.value > 45)
      event.target.value = '45';
    this.value = event.target.value;

    // else if (event.target.value < 3)
    //   event.target.value = '03';
    // else if (event.target.value > 45)
    //   event.target.value = '45';
    // if (event.keyCode == 38) {
    //   event.target.textContent
    // }
  }
}

