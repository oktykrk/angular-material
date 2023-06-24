import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSelectDialogDataSource } from '../../mat-select-dialog.datasource';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'lib-dialog-data-table',
    templateUrl: 'dialog-data-table.component.html',
    styleUrls: ['dialog-data-table.component.scss']
})

export class DialogDataTableComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @Output() done = new EventEmitter<Array<any>>();
    @Output() cancel = new EventEmitter();
    @Output() page = new EventEmitter<PageEvent>();
    @Output() filter = new EventEmitter<string>();

    public selectMode: 'single' | 'multi' = 'single';

    public get selectedRows(): Array<any> {
        return this._dataSource.selected;
    }

    private _tableDataSource!: MatTableDataSource<any>;
    public get tableDataSource(): MatTableDataSource<any> {
        return this._tableDataSource;
    }

    public filterText!: string;

    private _dataSource!: MatSelectDialogDataSource<any>;
    public get dataSource(): MatSelectDialogDataSource<any> {
        return this._dataSource;
    } public set dataSource(v: MatSelectDialogDataSource<any>) {
        this._dataSource = v;
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this._dataSource.pagingEnabled && this._dataSource.pagingMode === 'local') {
                this._tableDataSource = new MatTableDataSource(this._dataSource.data);
                this._tableDataSource.paginator = this.paginator;
            }
        }, 10);
    }

    private _filterEmitterAntiFloodTimeout: any = undefined;
    applyFilter(event: Event): void {
        this.filterText = (event.target as HTMLInputElement).value;

        // emit output but not on every key presses.
        if (this._filterEmitterAntiFloodTimeout) {
            clearTimeout(this._filterEmitterAntiFloodTimeout);
        }
        this._filterEmitterAntiFloodTimeout = setTimeout(() => {

            this.filter.emit(this.filterText);

            clearTimeout(this._filterEmitterAntiFloodTimeout);
            this._filterEmitterAntiFloodTimeout = undefined;
        }, 200);

        if (!this._dataSource.pagingEnabled || this._dataSource.pagingMode === 'local') {
            this._tableDataSource.filter = this.filterText.trim().toLowerCase();

            if (this._tableDataSource.paginator) {
                this._tableDataSource.paginator.firstPage();
            }
        }
    }

    onPage(e: PageEvent): void {
        this.page.emit(e);
    }

    onRowClick(element: any): void {
        const idx = this._dataSource.selected.indexOf(element);
        if (idx > -1) {
            this._dataSource.selected.splice(idx, 1);
            return;
        }

        if (this.selectMode === 'single') {
            this._dataSource.selected.length = 0;
        }
        this._dataSource.selected.push(element);
    }

    onCancelClick(): void {
        this._dataSource.rollbackSelected();
        this.cancel.emit();
    }

    onClearClick(): void {
        this._dataSource.selected.length = 0;
    }
}
