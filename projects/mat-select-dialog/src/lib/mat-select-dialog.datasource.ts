interface IMatSelectDialogDataSourceOptions<T> {
    data: Array<T>,
    displayedColumns: Array<string>,
    paging?: {
        enabled?: boolean,
        pageCounts?: Array<number>,
        pageIndex?: number,
        pageCount?: number,
        totalCount?: number | 'auto'
    }
}
export class MatSelectDialogDataSource<T> {
    private _pagingEnabled: boolean = true;
    public get pagingEnabled(): boolean {
        return this._pagingEnabled;
    }
    private _pageIndex: number = 0;
    public get pageIndex(): number {
        return this._pageIndex;
    }
    private _pageCount: number = 10;
    public get pageSize(): number {
        return this._pageCount;
    }
    private _pageCounts: Array<number> = [5, 10, 15];
    public get pageSizeOptions(): Array<number> {
        return this._pageCounts;
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

                this._pageIndex = options.paging.pageIndex || this._pageIndex;
                this._pageCounts = options.paging.pageCounts || this._pageCounts;
                this._pageCount = options.paging.pageCount || this._pageCount;
                this._totalCount = !options.paging.totalCount || options.paging.totalCount === 'auto' ? options.data.length : options.paging.totalCount as number;
            }
        }

    }
}
