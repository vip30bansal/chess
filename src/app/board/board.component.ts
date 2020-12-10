import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  initial_state: any = {};
  position: any = {
    A1: "w_rook",
    B1: "w_knight",
    C1: "w_bishop",
    D1: "w_queen",
    E1: "w_king",
    F1: "w_bishop",
    G1: "w_knight",
    H1: "w_rook",
    A2: "w_pawn",
    B2: "w_pawn",
    C2: "w_pawn",
    D2: "w_pawn",
    E2: "w_pawn",
    F2: "w_pawn",
    G2: "w_pawn",
    H2: "w_pawn",
    A3: "",
    B3: "",
    C3: "",
    D3: "",
    E3: "",
    F3: "",
    G3: "",
    H3: "",
    A4: "",
    B4: "",
    C4: "",
    D4: "",
    E4: "",
    F4: "",
    G4: "",
    H4: "",
    A5: "",
    B5: "",
    C5: "",
    D5: "",
    E5: "",
    F5: "",
    G5: "",
    H5: "",
    A6: "",
    B6: "",
    C6: "",
    D6: "",
    E6: "",
    F6: "",
    G6: "",
    H6: "",
    A7: "b_pawn",
    B7: "b_pawn",
    C7: "b_pawn",
    D7: "b_pawn",
    E7: "b_pawn",
    F7: "b_pawn",
    G7: "b_pawn",
    H7: "b_pawn",
    A8: "b_rook",
    B8: "b_knight",
    C8: "b_bishop",
    D8: "b_queen",
    E8: "b_king",
    F8: "b_bishop",
    G8: "b_knight",
    H8: "b_rook",
    prev_pos: ""
  };
  numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  enableUndo: boolean = false;
  prev_moves: any;
  moves: any = [];
  showSuggestion = "true";
  selectedPiece: any = "";
  selected: any;
  user: string = 'white';
  prevElem: any;
  avail_moves: any = [];
  green_dot: string = '<div style="height:14px;width:14px; margin:23px 23px;filter:blur(1px) opacity(70%) ;background-color:rgb(21, 245, 32);border-radius:50%;position:absolute;"></div>';

  constructor() { }

  ngOnInit(): void {
  }

  changeUser(event: any) {
    this.user = event.value;
    this.numbers.reverse();
    this.letters.reverse();
    console.log($(document.getElementById('timer')).css({ "flex-direction": "column-reverse" }));
  }

  click(el: any) {
    //let avail_moves = this.pawn_move(el);
    //if (this.position[el][0] == this.user[0]) {
    //$(event).find('img').css({ "border": "2px solid rgb(123, 185, 243),rgb(84, 166, 243)" });;
    console.log(el, "=>", this.position[el][0]);
    //console.log("selectedPiece:", this.position[this.selectedPiece]);
    if (this.position[el] == "")
      if (this.selectedPiece == "")
        this.selectedPiece = "";
      else {
        this.enableUndo = true;
        this.position.prev_pos = Object.assign({}, this.position);
        //this.prev_moves.push(this.position);
        this.hide_moves(this.avail_moves);
        this.position[el] = this.position[this.selectedPiece];
        this.moves.push(this.selectedPiece + '-' + el);
        this.position[this.selectedPiece] = "";
        this.selectedPiece = "";
      }
    else {
      //$(event).find('img').css({ "border": "2px solid springgreen" });
      if (this.selectedPiece == "") {
        if (this.position[el][0] == this.user[0]) {
          this.selectedPiece = el;
          this.prevElem = el;
          $(document.getElementById(el)).find('img').css({ "border": "3px double rgb(21, 245, 32)", "border-radius": "20%" });
          this.available_moves(el);
        }
      }
      else {
        if (this.position[this.selectedPiece][0] != this.position[el][0]) {
          this.enableUndo = true;
          this.position.prev_pos = Object.assign({}, this.position);
          //this.prev_moves.push(this.position);
          this.hide_moves(this.avail_moves);
          this.position[el] = this.position[this.selectedPiece];
          this.moves.push(this.selectedPiece + '-' + el);
          this.position[this.selectedPiece] = "";
          this.selectedPiece = "";
        }
        else {
          $(document.getElementById(this.prevElem)).find('img').css({ "border": "0px" });
          $(document.getElementById(el)).find('img').css({ "border": "3px double rgb(21, 245, 32)", "border-radius": "20%" });
          this.hide_moves(this.avail_moves);
          this.available_moves(el);
          this.prevElem = el;
          this.selectedPiece = el;
        }
      }
    }
  }

  available_moves(el: any) {
    switch (this.position[el].split('_')[1]) {
      case 'pawn':
        this.avail_moves = this.pawn_move(el);
        break;
      case 'rook':
        this.avail_moves = this.rook_move(el);
        break;
      case 'knight':
        this.avail_moves = this.knight_move(el);
        break;
      case 'bishop':
        this.bishop_move(el);
        break;
      case 'king':
        this.king_move(el);
        break;
      case 'queen':
        this.queen_move(el);
        break;
    }
  }
  pawn_move(el: any) {
    if (this.user == "white") {
      let moves = [];
      if (el[1] == "2") {
        moves = [el[0] + String.fromCharCode(el.charCodeAt(1) + 1), el[0] + String.fromCharCode(el.charCodeAt(1) + 2)];
      }
      else {
        moves = [el[0] + String.fromCharCode(el.charCodeAt(1) + 1)];
      }
      let flag = 1;
      moves = moves.filter(x => {
        if (flag && this.position[x] == "") {
          flag = 1;
          $(document.getElementById(x)).append(this.green_dot);
          return true;
        }
        else {
          flag = 0;
          return false;
        }
      });
      return moves;
    }
    else {
      if (el[1] == "7") {
        $(document.getElementById(el[0] + String.fromCharCode(el.charCodeAt(1) - 1))).append(this.green_dot);
        $(document.getElementById(el[0] + String.fromCharCode(el.charCodeAt(1) - 2))).append(this.green_dot);
        return [el[0] + String.fromCharCode(el.charCodeAt(1) - 1), el[0] + String.fromCharCode(el.charCodeAt(1) - 2)]
      }
      else {
        $(document.getElementById(el[0] + String.fromCharCode(el.charCodeAt(1) - 1))).append(this.green_dot);
        return [el[0] + String.fromCharCode(el.charCodeAt(1) - 1)];
      }
    }
  }
  rook_move(el: any) {
    let moves = [];
    let e;
    //el[0] + String.fromCharCode(el.charCodeAt(1) + 1)
    let i = 0;
    while (el.charCodeAt(1) + i < 56) {
      i += 1;
      e = String.fromCharCode(el.charCodeAt(1) + i);
      if (this.position[el[0] + e] == "") {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).append(this.green_dot);
      }
      else if (this.position[el[0] + e][0] != this.user[0]) {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        break;
      }
      else
        break;
    }
    i = 0;
    while (el.charCodeAt(0) + i < 72) {
      i += 1;
      e = String.fromCharCode(el.charCodeAt(0) + i);
      if (this.position[e + el[1]] == "") {
        moves.push(e + el[1]);
        $(document.getElementById(e + el[1])).append(this.green_dot);
      }
      else if (this.position[e + el[1]][0] != this.user[0]) {
        moves.push(e + el[1]);
        $(document.getElementById(e + el[1])).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        break;
      }
      else
        break;
    }
    i = 0;
    while (el.charCodeAt(1) - i > 49) {
      i += 1;
      e = String.fromCharCode(el.charCodeAt(1) - i);
      if (this.position[el[0] + e] == "") {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).append(this.green_dot);
      }
      else if (this.position[el[0] + e][0] != this.user[0]) {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        break;
      }
      else
        break;
    }
    i = 0;
    while (el.charCodeAt(0) - i > 65) {
      i += 1;
      e = String.fromCharCode(el.charCodeAt(0) - i);
      if (this.position[e + el[1]] == "") {
        moves.push(e + el[1]);
        $(document.getElementById(e + el[1])).append(this.green_dot);
      }
      else if (this.position[e + el[1]][0] != this.user[0]) {
        moves.push(e + el[1]);
        $(document.getElementById(e + el[1])).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        break;
      }
      else
        break;
    }
    return moves;
  }

  knight_move(el: any) {
    let moves = [];
    let e;
    let x = [(el.charCodeAt(0) - 2), (el.charCodeAt(0) - 2), (el.charCodeAt(0) - 1), (el.charCodeAt(0) + 1), (el.charCodeAt(0) + 2), (el.charCodeAt(0) + 2), (el.charCodeAt(0) + 1), (el.charCodeAt(0) - 1)];
    let y = [(el.charCodeAt(1) - 1), (el.charCodeAt(1) + 1), (el.charCodeAt(1) + 2), (el.charCodeAt(1) + 2), (el.charCodeAt(1) + 1), (el.charCodeAt(1) - 1), (el.charCodeAt(1) - 2), (el.charCodeAt(1) - 2)];
    for (let i = 0; i < 8; i++) {
      if ((x[i] > 64 && y[i] > 48) && (x[i] < 73 && y[i] < 57)) {
        e = String.fromCharCode(x[i]) + String.fromCharCode(y[i]);
        if (this.position[e] == "") {
          moves.push(e);
          $(document.getElementById(e)).append(this.green_dot);
        }
        else if (this.position[e][0] != this.user[0]) {
          moves.push(e);
          $(document.getElementById(e)).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        }
      }
    }
    return moves;
  }
  bishop_move(el: any) {
    let moves = [];
    let e;
    //el[0] + String.fromCharCode(el.charCodeAt(1) + 1)
    let i = 0;
    while (el.charCodeAt(1) + i < 56) {
      i += 1;
      e = String.fromCharCode(el.charCodeAt(1) + i);
      if (this.position[el[0] + e] == "") {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).append(this.green_dot);
      }
      else if (this.position[el[0] + e][0] != this.user[0]) {
        moves.push(el[0] + e);
        $(document.getElementById(el[0] + e)).find('img').css({ "border": "3px double rgb(245, 48, 14)", "border-radius": "20%" });
        break;
      }
      else
        break;
    }
  }
  king_move(el: any) {

  }
  queen_move(el: any) {

  }

  hide_moves(els: any) {
    for (let i = 0; i < els.length; i++) {
      $(document.getElementById(els[i])).find('div').remove();
      $(document.getElementById(els[i])).find('img').css({ "border": "0px" });
    }
  }
  undo_move() {
    if (this.enableUndo) {
      this.position = Object.assign({}, this.position.prev_pos);
      this.moves.pop();
      $(document.getElementById(this.selectedPiece)).find('img').css({ "border": "0px" });
      this.hide_moves(this.avail_moves);
      this.selectedPiece = "";
      if (this.position.prev_pos == "")
        this.enableUndo = false;
    }

  }
  show_suggestion(event) {
    if (event.checked) {
      this.green_dot = '<div style="height:14px;width:14px; margin:23px 23px;filter:blur(1px) opacity(70%) ;background-color:rgb(21, 245, 32);border-radius:50%;position:absolute;"></div>';
    }
    else {
      this.green_dot = "";
      this.hide_moves(this.avail_moves);
    }
  }
}
