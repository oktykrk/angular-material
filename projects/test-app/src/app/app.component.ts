import { Component } from '@angular/core';
import { MatSelectDialogDataSource } from 'mat-select-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectDataSource = new MatSelectDialogDataSource({
    data: [{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },{
      Id: 1,
      Name: 'Hello'
    },],
    displayedColumns: ['Id', 'Name'],
    paging: {
      enabled: true
    }
  });

  title = 'test-app';
}
