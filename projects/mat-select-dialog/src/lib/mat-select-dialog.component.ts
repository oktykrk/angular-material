import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectDialogDataSource } from './mat-select-dialog.datasource';
import { MatSelectDialogService } from './mat-select-dialog.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mat-select-dialog',
  template: `
    <mat-form-field [appearance]="appearance" style="flex: 1" (click)="onInputClick()">
      <mat-label>{{label}}</mat-label>
      <input readonly matInput [placeholder]="placeholder">
      <mat-icon *ngIf="suffix" matSuffix>{{suffix}}</mat-icon>
      <mat-icon *ngIf="prefix" matPrefix>{{prefix}}</mat-icon>
      <mat-hint *ngIf="hint">{{hint}}</mat-hint>
    </mat-form-field>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }
  `]
})
export class MatSelectDialogComponent implements OnInit, OnDestroy {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = 'Select';
  @Input() placeholder: string = 'Select an item';
  @Input() suffix?: string = 'search';
  @Input() prefix?: string;
  @Input() hint?: string = 'Click to select an item from list.';
  @Input() dataSource!: MatSelectDialogDataSource<any>;
  @Input() mode: 'multi' | 'single' = 'single';

  @Input() dialogWidth?: string;

  @Output() done = new EventEmitter<Array<any>>();
  @Output() page = new EventEmitter<PageEvent>();
  @Output() filter = new EventEmitter<string>();

  private _pageSub?: Subscription;
  private _filterSub?: Subscription;

  constructor(
    private _selectDialogService: MatSelectDialogService
  ) { }

  ngOnInit(): void {
    this._pageSub = this._selectDialogService.page.subscribe(p => this.page.emit(p));
    this._filterSub = this._selectDialogService.filter.subscribe(f => this.filter.emit(f));
  }

  ngOnDestroy(): void {
    this._pageSub && this._pageSub.unsubscribe();
    this._filterSub && this._filterSub.unsubscribe();
  }

  async onInputClick(): Promise<void> {
    const seledted = await this._selectDialogService.selectFrom(this.dataSource, {
      mode: this.mode,
      dialogWidth: this.dialogWidth
    });
    this.done.emit(seledted);
  }
}
