import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSelectDialogDataSource } from 'mat-select-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectDataSource = new MatSelectDialogDataSource({
    data: [],
    displayedColumns: ['id', 'title', 'completed'],
    paging: {
      enabled: true,
      mode: 'remote',
      pageSize: 1,
      pageSizeOptions: [1, 2, 3],
      pageIndex: 0,
      totalCount: 150
    }
  });

  title = 'test-app';

  /**
   *
   */
  constructor(
    httpClient: HttpClient
  ) {
    httpClient.get('https://mat-select-dialog-data.free.beeceptor.com').subscribe(res =>{
      console.log(res);
      this.selectDataSource.setData(res as any);
    })
    
  }
}
