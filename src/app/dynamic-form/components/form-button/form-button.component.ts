import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  @HostBinding('classList') _classes: string;
  config;
  group: FormGroup;
  fc: FormControl;

  constructor() { }

  ngOnInit() {
    // set host classes
    this._classes = (this.config.classes && this.config.classes.container) ?  this.config.classes.container : '';
  }

}
