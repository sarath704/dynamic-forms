import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, retry } from 'rxjs/operators';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.scss']
})
export class Form4Component implements OnInit {
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
