import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { Form3Component } from './form3/form3.component';
import { Form4Component } from './form4/form4.component';
import { Form5Component } from './form5/form5.component';
import { Form6Component } from './form6/form6.component';
import { Form7Component } from './form7/form7.component';
import { Form8Component } from './form8/form8.component';

const routes: Routes = [
  {path: 'form1', component: Form1Component},
  {path: 'form2', component: Form2Component},
  {path: 'form3', component: Form3Component},
  {path: 'form4', component: Form4Component},
  {path: 'form5', component: Form5Component},
  {path: 'form6', component: Form6Component},
  {path: 'form7', component: Form7Component},
  {path: 'form8', component: Form8Component},
  {path: '*', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
