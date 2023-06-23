import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatSelectDialogComponent } from './mat-select-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectDialogService } from './mat-select-dialog.service';

@NgModule({
  declarations: [
    MatSelectDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatSelectDialogComponent
  ],
  providers: [MatSelectDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatSelectDialogModule { }
