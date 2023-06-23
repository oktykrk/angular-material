import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
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

    @Output() page = new EventEmitter<PageEvent>();
    @Output() filter = new EventEmitter<string>();

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
    ) { }

    ngAfterViewInit(): void {
        if (this.pagingEnabled && this.pagingMode === 'local') {
        this._localPagingDataSource = new MatTableDataSource<any>(this._dataSource.data);
        this._localPagingDataSource.paginator = this.paginator;
        }
    }

    applyFilter(event: Event): void {
        this.filterText = (event.target as HTMLInputElement).value;
        if (this.pagingEnabled && this.pagingMode === 'remote') {
            this.filter.emit(this.filterText);
        } else {
            this._localPagingDataSource.filter = this.filterText.trim().toLowerCase();

            if (this._localPagingDataSource.paginator) {
                this._localPagingDataSource.paginator.firstPage();
            }
        }
    }

    onPage(e: PageEvent): void {
        this.page.emit(e);
    }
}
