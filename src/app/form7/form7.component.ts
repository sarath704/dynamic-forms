import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, filter, pluck, retry } from 'rxjs/operators';

@Component({
  selector: 'app-form7',
  templateUrl: './form7.component.html',
  styleUrls: ['./form7.component.scss']
})
export class Form7Component implements OnInit {
  @Input() templateId;
  public config: any;
  public createdForm: FormGroup;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.templateId = param.id;
      this.getTemplate(this.templateId)
        .subscribe(template => {
            console.log(`Template ${this.templateId}`, template);
            this.config = template;
          }
        );
    });
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

  handleFormCreation(form: FormGroup): void {
    this.createdForm = form;

    this.createdForm.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.createdForm.valid)
      )
      .subscribe(newValue => {
          console.log(newValue);
        }
      );
  }
}
