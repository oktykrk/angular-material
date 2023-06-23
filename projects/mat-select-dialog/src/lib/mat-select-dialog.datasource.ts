interface IMatSelectDialogDataSourceOptions<T> {
    data: Array<T>,
    displayedColumns: Array<string>,
    paging?: {
        enabled?: boolean,
        mode?: 'local' | 'remote',
        pageSizeOptions?: Array<number>,
        pageIndex?: number,
        pageSize?: number,
        totalCount?: number
    }
}
export class MatSelectDialogDataSource<T> {
    private _pagingEnabled: boolean = true;
    public get pagingEnabled(): boolean {
        return this._pagingEnabled;
    }
    private _pagingMode: 'local' | 'remote' = 'local';
    public get pagingMode(): 'local' | 'remote' {
        return this._pagingMode;
    }
    private _pageIndex: number = 0;
    public get pageIndex(): number {
        return this._pageIndex;
    }
    private _pageSize: number = 10;
    public get pageSize(): number {
        return this._pageSize;
    }
    private _pageSizeOptions: Array<number> = [5, 10, 15];
    public get pageSizeOptions(): Array<number> {
        return this._pageSizeOptions;
    }
    private _totalCount: number = 10;
    public get totalCount(): number {
        return this._totalCount;
    }
    private _displayedColumns: Array<string> = [];
    public get displayedColumns(): Array<string> {
        return this._displayedColumns;
    }
    private _data: Array<T> = [];
    public get data(): Array<T> {
        return this._data;
    }

    /**
     *
     */
    constructor(options: IMatSelectDialogDataSourceOptions<T>) {
        this._data = options.data;
        this._displayedColumns = options.displayedColumns;

        if (!options.paging) {
            this._pagingEnabled = false;
        } else {
            if (options.paging.enabled !== undefined && options.paging.enabled === true) {
                this._pagingEnabled = true;
                this._pagingMode = options.paging.mode || this._pagingMode;

                this._pageIndex = options.paging.pageIndex || this._pageIndex;
                this._pageSizeOptions = options.paging.pageSizeOptions || this._pageSizeOptions;
                this._pageSize = options.paging.pageSize || this._pageSize;

                this._totalCount = options.paging.mode === 'remote' ? options.paging.totalCount || 0 : options.data.length;

                alert(this._totalCount )
            }
        }
    }

    /** */
    public setData(data: Array<T>): void {
        this._data = data;
    }
}
