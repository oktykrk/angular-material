import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataTableComponent } from './components/data-table/dialog-data-table.component';
import { MatSelectDialogDataSource } from './mat-select-dialog.datasource';

@Injectable()
export class MatSelectDialogService {

  constructor(
    private _dialog: MatDialog
  ) { }

  public selectFrom(dataSource: MatSelectDialogDataSource<any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve();

      this._dialog.open(DialogDataTableComponent, {
        data: dataSource
      });
    });
  }

}
