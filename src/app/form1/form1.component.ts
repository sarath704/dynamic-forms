import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as randomString from 'node_modules/random-string';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {
  // config = [
  //   {
  //     type: 'input',
  //     label: 'Full name',
  //     name: 'name',
  //     placeholder: 'Enter your name',
  //     fxLayout: 'row',
  //     fxLayoutXs: 'column',
  //     fxLayoutAlign: ' center center',
  //     fxLayoutAlignXs: 'center stretch',
  //     fxLayoutGap: '10px',
  //     fxFlex: {
  //       label: '0 0 auto',
  //       input: '1 1 auto'
  //     }
  //   },
  //   {
  //     type: 'select',
  //     label: 'Favourite food',
  //     name: 'food',
  //     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
  //     placeholder: 'Select an option',
  //     fxLayout: 'row',
  //     fxLayoutXs: 'column',
  //     fxLayoutAlign: ' center center',
  //     fxLayoutAlignXs: 'center stretch',
  //     fxLayoutGap: '10px',
  //     fxFlex: {
  //       label: '0 0 auto',
  //       select: '1 1 auto'
  //     }
  //   },
  //   {
  //     label: 'Submit',
  //     name: 'submit',
  //     type: 'button',
  //     color: 'warn',
  //     fxLayout: 'row',
  //     fxLayoutXs: 'row',
  //     fxLayoutAlign: 'center center',
  //     fxFlex: {
  //       button: '0 0 auto',
  //       xs: {
  //         button: '1 1 auto'
  //       }
  //     }
  //   }
  // ];
  @Input() templateId;
  public config: any;
  public formValues: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.templateId = param.id;
      this.getTemplate(this.templateId)
        .subscribe(template => {
            // console.log(`Template ${this.templateId}`, template);
            this.config = template;
          }
        );
    });

    const food = ['Food1', 'Food2', 'Food3', 'Food4'][Math.floor(Math.random() * 4)];
    this.formValues = {
      name: this.getString(), food: food, column1: false
    };
    console.log(this.formValues);
  }

  getTemplate(id): Observable<any> {
    return this.http.post('http://0.0.0.0:7777/api/v1/templates/get-template', { templateId: id })
      .pipe(
        retry(3),
        pluck('templateContent')
      );
  }

  handleFormSubmit(formValue) {
    console.log(formValue);
  }

  getString() {
    return randomString({
      length: Math.random() * 10 + 8,
      numeric: false,
      letters: true,
      special: false
    });
  }
}
