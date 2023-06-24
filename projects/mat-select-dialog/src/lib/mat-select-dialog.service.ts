import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataTableComponent } from './components/data-table/dialog-data-table.component';
import { MatSelectDialogDataSource } from './mat-select-dialog.datasource';
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class MatSelectDialogService {

  @Output() page = new EventEmitter<PageEvent>();
  @Output() filter = new EventEmitter<string>();

  constructor(
    private _dialog: MatDialog
  ) { }

  public selectFrom(dataSource: MatSelectDialogDataSource<any>, options?: {
    mode?: 'single' | 'multi',
    dialogWidth?: string
  }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve();

      const ref = this._dialog.open(DialogDataTableComponent, {
        data: dataSource,
        width: options?.dialogWidth
      });

      ref.componentInstance.selectMode = options?.mode || 'single';

      const pageSub = ref.componentInstance.page.subscribe(p => this.page.emit(p));
      const filterSub = ref.componentInstance.filter.subscribe(f => this.filter.emit(f));

      const closeSub = ref.beforeClosed().subscribe(() => {
        pageSub.unsubscribe();
        filterSub.unsubscribe();
        closeSub.unsubscribe();
      })
    });
  }

}
