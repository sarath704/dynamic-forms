import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { Form3Component } from './form3/form3.component';
import { Form4Component } from './form4/form4.component';
import { Form5Component } from './form5/form5.component';
import { Form6Component } from './form6/form6.component';
import { Form7Component } from './form7/form7.component';
import { Form8Component } from './form8/form8.component';

@NgModule({
  declarations: [
    AppComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    Form4Component,
    Form5Component,
    Form6Component,
    Form7Component,
    Form8Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DynamicFormModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
