import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { pluck, retry } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.scss']
})
export class Form5Component implements OnInit {
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
            // console.log(`Template ${this.templateId}`, template);
            this.config = template;
          }
        );
    });


    // programatically modify content of the dynamic form
    timer(3000)
      .subscribe(() => {
        console.log(`Removing second group`);
        this.config.splice(2, 1);
      });

    timer(6000)
      .subscribe(() => {
        console.log(`Removing checkbox 1 from first group`);
        const removedChild = { ...this.config[1].controls[1].controls[1] };
        this.config[1].controls[1].controls.splice(1, 1);
        timer(3000).subscribe(() => {
          console.log(`Added child checkbox 1 back`);
          this.config[1].controls[1].controls.splice(1, 0, removedChild);
        });
      });

    timer(3000)
      .subscribe(() => {
        const res = this.createdForm.patchValue({tada: 1, baba: 2});
        console.log(`patchResult: `, res);
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
  }
}

const aa = [
  {
    'type': 'subGroup',
    'name': 'configSetter',
    'fxLayout': 'column',
    'fxLayoutAlign': 'start stretch',
    'controls': [
      {
        'type': 'select',
        'label': '',
        'name': 'config',
        'options': [
          'Config1',
          'Config2',
          'Config3',
          'Config4',
          'Config5'
        ],
        'placeholder': 'Select config',
        'validations': [
          {
            'name': 'required',
            'type': 'required',
            'message': 'Config Required'
          }
        ],
        'fxLayout': 'row',
        'fxLayoutXs': 'column',
        'fxLayoutAlign': ' center center',
        'fxLayoutAlignXs': 'center stretch',
        'fxLayoutGap': '10px',
        'fxFlex': {
          'label': '0 0 auto',
          'select': '1 1 auto'
        }
      },
      {
        'label': 'Change Config',
        'name': 'commit',
        'type': 'button',
        'color': 'accent',
        'fxLayout': 'row',
        'fxLayoutXs': 'row',
        'fxLayoutAlign': 'center center',
        'fxFlex': {
          'button': '0 0 auto',
          'xs': {
            'button': '1 1 auto'
          }
        }
      }
    ]
  },
  {
    'type': 'subGroup',
    'name': 'subgroup1',
    'fxLayout': 'column',
    'fxLayoutAlign': 'start stretch',
    'classes': {
      'container': 'flex-100'
    },
    'controls': [
      {
        'type': 'input',
        'value': 'Change 1',
        'name': 'name',
        'placeholder': 'Enter Change Name',
        'validations': [
          {
            'name': 'required',
            'type': 'required',
            'message': 'Change Name Required'
          }
        ],
        'fxLayout': 'row',
        'fxLayoutXs': 'column',
        'fxLayoutAlign': ' center stretch',
        'fxLayoutAlignXs': 'center stretch',
        'fxLayoutGap': '10px',
        'fxFlex': {
          'label': '0 0 auto',
          'input': '1 1 auto'
        }
      },
      {
        'type': 'subGroup',
        'name': 'subgroup11',
        'fxLayout': 'column',
        'fxLayoutAlign': 'start stretch',
        'classes': {
          'container': 'flex-100',
          'divContainer': 'max-height-overflow height-210'
        },
        'controls': [
          {
            'type': 'checkbox',
            'label': 'Column title 1',
            'name': 'column1',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': true
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 2',
            'name': 'column2',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 3',
            'name': 'column3',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 4',
            'name': 'column4',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 5',
            'name': 'column5',
            'state': {
              'indeterminate': true,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 6',
            'name': 'column6',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': true
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 7',
            'name': 'column7',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 8',
            'name': 'column8',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 9',
            'name': 'column9',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 10',
            'name': 'column10',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 11',
            'name': 'column11',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          }
        ]
      }
    ]
  },
  {
    'type': 'subGroup',
    'name': 'subgroup2',
    'fxLayout': 'column',
    'fxLayoutAlign': 'start stretch',
    'classes': {
      'container': 'flex-100'
    },
    'controls': [
      {
        'type': 'input',
        'value': 'Change 2',
        'name': 'name',
        'placeholder': 'Enter Change Name',
        'validations': [
          {
            'name': 'required',
            'type': 'required',
            'message': 'Change Name Required'
          }
        ],
        'fxLayout': 'row',
        'fxLayoutXs': 'column',
        'fxLayoutAlign': ' center center',
        'fxLayoutAlignXs': 'center stretch',
        'fxLayoutGap': '10px',
        'fxFlex': {
          'label': '0 0 auto',
          'input': '1 1 auto'
        }
      },
      {
        'type': 'subGroup',
        'name': 'subgroup21',
        'fxLayout': 'column',
        'fxLayoutAlign': 'start stretch',
        'classes': {
          'container': 'flex-100',
          'divContainer': 'max-height-overflow height-315'
        },
        'controls': [
          {
            'type': 'input',
            'label': '',
            'name': 'name',
            'placeholder': 'Enter your name',
            'validations': [
              {
                'name': 'required',
                'type': 'required',
                'message': 'Full Name Required'
              },
              {
                'name': 'pattern',
                'type': 'pattern',
                'expression': '^[a-zA-Z]+$',
                'message': 'Accept only text'
              }
            ],
            'fxLayout': 'row',
            'fxLayoutXs': 'column',
            'fxLayoutAlign': ' center center',
            'fxLayoutAlignXs': 'center stretch',
            'fxLayoutGap': '10px',
            'fxFlex': {
              'label': '0 0 auto',
              'input': '1 1 auto'
            }
          },
          {
            'type': 'select',
            'label': '',
            'name': 'food',
            'options': [
              'Food1',
              'Food2',
              'Food3',
              'Food4'
            ],
            'placeholder': 'Select favourite food',
            'validations': [
              {
                'name': 'required',
                'type': 'required',
                'message': 'Favourite food Required'
              }
            ],
            'fxLayout': 'row',
            'fxLayoutXs': 'column',
            'fxLayoutAlign': ' center center',
            'fxLayoutAlignXs': 'center stretch',
            'fxLayoutGap': '10px',
            'fxFlex': {
              'label': '0 0 auto',
              'select': '1 1 auto'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 1',
            'name': 'column1',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': true
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 1',
            'name': 'column1',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': true
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 2',
            'name': 'column2',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 3',
            'name': 'column3',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 4',
            'name': 'column4',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 5',
            'name': 'column5',
            'state': {
              'indeterminate': true,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 6',
            'name': 'column6',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': true
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 7',
            'name': 'column7',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 8',
            'name': 'column8',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 9',
            'name': 'column9',
            'state': {
              'indeterminate': false,
              'disabled': true,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 10',
            'name': 'column10',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          },
          {
            'type': 'checkbox',
            'label': 'Column title 11',
            'name': 'column11',
            'state': {
              'indeterminate': false,
              'disabled': false,
              'checked': false
            },
            'color': 'accent',
            'classes': {
              'container': 'flex-100'
            }
          }
        ]
      }
    ]
  },
  {
    'label': 'Submit',
    'name': 'submit',
    'type': 'button',
    'color': 'accent',
    'fxLayout': 'row',
    'fxLayoutXs': 'row',
    'fxLayoutAlign': 'center center',
    'fxFlex': {
      'button': '0 0 auto',
      'xs': {
        'button': '1 1 auto'
      }
    }
  }
];
