import { AfterContentInit, AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-select-autocomplete',
  templateUrl: './form-select-autocomplete.component.html',
  styleUrls: ['./form-select-autocomplete.component.scss']
})
export class FormSelectAutocompleteComponent implements OnInit, AfterContentInit {
  @HostBinding('classList') _classes: string;
  config;
  group: FormGroup;
  fc: FormControl;
  filteredOptions: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    // set host classes
    this._classes = (this.config.classes && this.config.classes.container) ?  this.config.classes.container : '';
  }

  ngAfterContentInit(): void {
    this.filteredOptions = this.group.controls[this.config.name].valueChanges
      .pipe(
        startWith(''),
        map((option: string) => {
          return option ? this._filterOptions(option) : this.config.options.slice();
        })
      );
  }

  private _filterOptions(value: string): any {
    const filterValue = value.toLowerCase();
    return this.config.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
