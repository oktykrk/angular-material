import { AfterViewInit, Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Output() close = new EventEmitter();
    @Output() page = new EventEmitter<PageEvent>();
    @Output() filter = new EventEmitter<string>();

    public selectMode: 'single' | 'multi' = 'single';

    private _selectedRows: Array<any> = [];
    public get selectedRows(): Array<any> {
        return this._selectedRows;
    }

    private _localPagingDataSource!: MatTableDataSource<any>;
    public get localPagingDataSource(): MatTableDataSource<any> {
        return this._localPagingDataSource;
    }

    public filterText!: string;

    public get data(): Array<any> {
        return this._dataSource.data;
    }
    public get displayedColumns(): Array<string> {
        return this._dataSource.displayedColumns;
    }
    public get pagingEnabled(): boolean {
        return this._dataSource.pagingEnabled;
    }
    public get showPageSize(): boolean {
        return this._dataSource.showPageSize;
    }
    public get pagingMode(): 'local' | 'remote' {
        return this._dataSource.pagingMode;
    }
    public get pageIndex(): number {
        return this._dataSource.pageIndex;
    }
    public get pageSize(): number {
        return this._dataSource.pageSize;
    }
    public get pageSizeOptions(): Array<number> {
        return this._dataSource.pageSizeOptions;
    }
    public get totalCount(): number {
        return this._dataSource.totalCount;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private _dataSource: MatSelectDialogDataSource<any>
    ) {
        if (this.pagingEnabled && this.pagingMode === 'local') {
            this._localPagingDataSource = new MatTableDataSource<any>(this._dataSource.data);
        }
    }

    ngAfterViewInit(): void {
        if (this.pagingEnabled && this.pagingMode === 'local') {
            this._localPagingDataSource.paginator = this.paginator;
        }
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

        if (!this.pagingEnabled || this.pagingMode === 'local') {
            this._localPagingDataSource.filter = this.filterText.trim().toLowerCase();

            if (this._localPagingDataSource.paginator) {
                this._localPagingDataSource.paginator.firstPage();
            }
        }
    }

    onPage(e: PageEvent): void {
        this.page.emit(e);
    }

    onRowClick(element: any): void {
        if (this.selectMode === 'single') {
            this._selectedRows = [element];
        } else {
            const idx = this._selectedRows.indexOf(element);
            if (idx > -1) {
                this._selectedRows.splice(idx, 1);
            } else {
                this._selectedRows.push(element);
            }
        }
    }
}
