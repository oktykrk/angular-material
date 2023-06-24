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
    dialogWidth?: string,
    dialogHeight?: string,
  }): Promise<Array<any>> {
    return new Promise<Array<any>>((resolve, reject) => {
      const ref = this._dialog.open(DialogDataTableComponent, {
        width: options?.dialogWidth,
        height: options?.dialogHeight
      });

      ref.componentInstance.dataSource = dataSource;
      ref.componentInstance.selectMode = options?.mode || 'single';

      const pageSub = ref.componentInstance.page.subscribe(p => this.page.emit(p));
      const filterSub = ref.componentInstance.filter.subscribe(f => this.filter.emit(f));
      const doneSub = ref.componentInstance.done.subscribe(s => {
        resolve(s);
        ref.close();
      });
      const cancelSub = ref.componentInstance.cancel.subscribe(() => ref.close());

      const closeSub = ref.beforeClosed().subscribe(() => {
        pageSub.unsubscribe();
        filterSub.unsubscribe();
        doneSub.unsubscribe();
        cancelSub.unsubscribe();
        closeSub.unsubscribe();
      });
    });
  }

}
