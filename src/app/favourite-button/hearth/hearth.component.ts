import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hearth-button',
  templateUrl: './hearth.component.html',
  styleUrls: ['./hearth.component.css']
})
export class HearthButton implements OnInit {

  @Input() selected: boolean | undefined;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}