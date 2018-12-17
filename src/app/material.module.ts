import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
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

  ],
  entryComponents: []
})
export class MaterialModule {
}
