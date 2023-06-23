import { TestBed } from '@angular/core/testing';

import { MatSelectDialogService } from './mat-select-dialog.service';

describe('MatSelectDialogService', () => {
  let service: MatSelectDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSelectDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
