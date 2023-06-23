import { Component } from '@angular/core';
import { MatSelectDialogDataSource } from 'mat-select-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectDataSource = new MatSelectDialogDataSource([]);

  title = 'test-app';
}
