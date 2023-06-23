export class MatSelectDialogDataSource<T> {
    private _data: Array<T> = [];

    /**
     *
     */
    constructor(data: Array<T>) {
        this._data = data;
    }
}
