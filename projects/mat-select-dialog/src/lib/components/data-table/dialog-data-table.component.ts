import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectDialogDataSource } from '../../mat-select-dialog.datasource';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'lib-dialog-data-table',
    templateUrl: 'dialog-data-table.component.html',
    styleUrls: ['dialog-data-table.component.scss']
})

export class DialogDataTableComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    private _tableDataSource!: MatTableDataSource<any>;
    public get tableDataSource(): MatTableDataSource<any> {
        return this._tableDataSource;
    }

    public get data(): Array<any> {
        return this._dataSource.data;
    }
    public get displayedColumns(): Array<string> {
        return this._dataSource.displayedColumns;
    }
    public get pagingEnabled(): boolean {
        return this._dataSource.pagingEnabled;
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
        this._tableDataSource = new MatTableDataSource<any>(_dataSource.data);
    }

    ngAfterViewInit(): void {
        if (this.pagingEnabled) {
            this._tableDataSource.paginator = this.paginator;
        }
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this._tableDataSource.filter = filterValue.trim().toLowerCase();

        if (this._tableDataSource.paginator) {
            this._tableDataSource.paginator.firstPage();
        }
    }
}