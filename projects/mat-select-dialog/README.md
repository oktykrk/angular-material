# MatSelectDialog

A ready to use component that promotes data select functionality from a material table with dialog.

![alt text](https://github.com/oktykrk/angular-material/blob/main/images/3.png?raw=true)

- `single` or `multi` selection modes.
- `pagination` supporting local/remote data fetch.

![alt text](https://github.com/oktykrk/angular-material/blob/main/images/4.png?raw=true)

- respective to your `material theme` customization.
- easy to use !!!!

```
import { MatSelectDialogModule } from 'ngx-mat-select-dialog';
```

```
imports: [
    MatSelectDialogModule,
],
```

```
<mat-select-dialog 
    [dataSource]="selectDataSource" 
    (page)="onPage($event)" 
    (filter)="onFilter($event)" 
    (done)="onDone($event)" 
    [dialogWidth]="'640px'" 
    [mode]="'multi'" 
    [custimizeDisplayText]="custimizeDisplayText"
></mat-select-dialog>
```
Example:
```
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectDialogDataSource } from 'mat-select-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedItems: Array<any> = [];
  selectDataSource = new MatSelectDialogDataSource<any>({
    data: [],
    displayedColumns: ['id', 'title', 'completed'],
    paging: {
      enabled: true,
      mode: 'local',
      pageSize: 10,
      pageIndex: 0
    }
  });

  title = 'test-app';

  /**
   *
   */
  constructor(
    private httpClient: HttpClient
  ) {
    httpClient.get<Array<any>>('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
      this.selectDataSource.setData(res);
      this.selectedItems = res;
    })
  }

  onPage(e: PageEvent): void {
    this.httpClient.get<Array<any>>('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
      res.splice(0, 100);
      this.selectDataSource.setData(res);
    });
  }

  onFilter(f: string): void {
    console.log(f);
  }

  onDone(selected: Array<any>): void {
    console.log(selected);
  }

  custimizeDisplayText(selected: Array<{title: string}>): string {
    return selected.map(s => s.title).join(', ');
  }
}

```