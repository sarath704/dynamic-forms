import { Component, HostBinding, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-of-controls',
  templateUrl: './list-of-controls.component.html',
  styleUrls: ['./list-of-controls.component.scss']
})
export class ListOfControlsComponent implements OnInit {
  @HostBinding('classList') _classes: string;
  group: FormGroup;
  config;
  fc: FormGroup;

  constructor() {
  }

  ngOnInit() {
    // apply classes on self
    this._classes = (this.config.classes && this.config.classes.container) ?  this.config.classes.container : '';
  }
}
