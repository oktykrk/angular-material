import { NgModule } from '@angular/core';
import { DialogDataTableComponent } from './dialog-data-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [],
    exports: [
        MatTableModule,
        MatPaginatorModule,
    ],
    declarations: [DialogDataTableComponent],
    providers: [],
})
export class DialogDataTableModule { }
