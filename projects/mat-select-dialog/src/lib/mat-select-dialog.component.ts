import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectDialogDataSource } from './mat-select-dialog.datasource';
import { MatSelectDialogService } from './mat-select-dialog.service';

@Component({
  selector: 'mat-select-dialog',
  template: `
    <mat-form-field [appearance]="appearance" style="flex: 1">
      <mat-label>{{label}}</mat-label>
      <input readonly matInput [placeholder]="placeholder" (focus)="onInputFocus()">
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
export class MatSelectDialogComponent {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = 'Select';
  @Input() placeholder: string = 'Select an item';
  @Input() suffix?: string = 'search';
  @Input() prefix?: string;
  @Input() hint?: string = 'Click to select an item from list.';

  @Input() dataSource!: MatSelectDialogDataSource<any>;

  @Input() mode: 'multi' | 'single' = 'single';

  @Output() change = new EventEmitter();

  constructor(
    private _selectDialogService: MatSelectDialogService
  ) { }

  async onInputFocus(): Promise<void> {
    await this._selectDialogService.selectFrom(this.dataSource);
  }
}
