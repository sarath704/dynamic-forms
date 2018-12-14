import { Component, Input, OnInit } from '@angular/core';
import { pluck, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {
/*  config = [
    {
      type: 'input',
      label: 'Friend name',
      name: 'name',
      placeholder: 'Enter your Friend',
      fxLayout: 'row',
      fxLayoutXs: 'column',
      fxLayoutAlign: ' center center',
      fxLayoutAlignXs: 'center stretch',
      fxLayoutGap: '10px',
      fxFlex: {
        label: '0 0 auto',
        input: '1 1 auto'
      }
    },
    {
      type: 'select',
      label: 'Favourite sport',
      name: 'food',
      options: ['Laptenis', 'Soccer', 'Bowling', 'Sitting'],
      placeholder: 'Select an option',
      fxLayout: 'row',
      fxLayoutXs: 'column',
      fxLayoutAlign: ' center center',
      fxLayoutAlignXs: 'center stretch',
      fxLayoutGap: '10px',
      fxFlex: {
        label: '0 0 auto',
        select: '1 1 auto'
      }
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      color: 'warn',
      fxLayout: 'row',
      fxLayoutXs: 'row',
      fxLayoutAlign: 'center center',
      fxFlex: {
        button: '0 0 auto',
        xs: {
          button: '1 1 auto'
        }
      }
    }
  ];*/

  @Input() templateId;
  public config: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.templateId = param.id;
      this.getTemplate(this.templateId)
        .subscribe( template => {
            // console.log(`Template ${this.templateId}`, template);
            this.config = template;
          }
        );
    });
  }

  getTemplate(id): Observable<any> {
    return this.http.post('http://0.0.0.0:7777/api/v1/templates/get-template', {templateId: id})
      .pipe(
        retry(3),
        pluck('templateContent')
      );
  }

  handleFormSubmit(formValue) {
    console.log(formValue);
  }

}
