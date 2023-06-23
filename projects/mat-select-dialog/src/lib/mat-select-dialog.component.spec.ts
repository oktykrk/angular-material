import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectDialogComponent } from './mat-select-dialog.component';

describe('MatSelectDialogComponent', () => {
  let component: MatSelectDialogComponent;
  let fixture: ComponentFixture<MatSelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatSelectDialogComponent]
    });
    fixture = TestBed.createComponent(MatSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
