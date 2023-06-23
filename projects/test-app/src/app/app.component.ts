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
  selectDataSource = new MatSelectDialogDataSource<any>({
    data: [],
    displayedColumns: ['id', 'title', 'completed'],
    paging: {
      enabled: true,
      mode: 'local',
      pageSize: 10,
      pageSizeOptions: [5, 10, 15],
      pageIndex: 0,
      totalCount: 150
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
    })

  }

  onPage(e: PageEvent) {
    this.httpClient.get<Array<any>>('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
      res.splice(0, 100);
      this.selectDataSource.setData(res);
    });
  }

  onFilter(f: string) {
    console.log(f);
  }
}
