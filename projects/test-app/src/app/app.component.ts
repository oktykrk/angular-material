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
      // this.selectDataSource.setSelected(res.filter(d => d.id % 10 === 5));
      this.selectedItems = res;
    })
  }

  onPage(e: PageEvent): void {
    this.httpClient.get<Array<any>>('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
      res.splice(0, 100);
      this.selectDataSource.setData(res);
      // this.selectDataSource.setSelected(res.filter(d => d.id % 6 === 0));
    });
  }

  onFilter(f: string): void {
    console.log(f);
  }

  onDone(selected: Array<any>): void {
    console.log(selected);
  }

  customizeDisplayText(selected: Array<{title: string}>): string {
    return selected.map(s => s.title).join(', ');
  }
}
