import { NgModule } from '@angular/core';
import { DialogDataTableComponent } from './dialog-data-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
    ],
    declarations: [DialogDataTableComponent],
    exports: [DialogDataTableComponent],
})
export class DialogDataTableModule { }
