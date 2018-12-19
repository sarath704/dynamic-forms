import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: []
})
export class MaterialModule {
}
