import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
@Component({
  providers: [BoardComponent],
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {
  @Input() position: any;
  constructor(private board: BoardComponent) { }

  ngOnInit(): void {
  }
  click(el) {
    this.board.click(el);
  }
}
