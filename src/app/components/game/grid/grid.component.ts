import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { arraysEqual, range, zeros } from '../../../shared/utils';

@Component({
    selector: 'bin-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.less'],
    imports: [BoxComponent]
})
export class GridComponent implements OnInit {
  range: number[] = [];
  rowTot: number[] = [];
  colTot: number[] = [];
  rowTarget: number[] = [];
  colTarget: number[] = [];
  success = false;

  @Input() stopped: boolean;
  @Input() size: number;
  @ViewChildren(BoxComponent) boxes: QueryList<BoxComponent>;
  @Output() completed = new EventEmitter<boolean>();

  private grid: number[][];

  ngOnInit(): void {
    this.range = range(this.size);
    this.init();
  }

  updateValue(row: number, col: number, value: number): void {
    const mul = value ? 1 : -1;

    this.rowTot[row] += mul * 2 ** (this.size - col - 1);
    this.colTot[col] += mul * 2 ** (this.size - row - 1);

    this.success = arraysEqual(this.rowTot, this.rowTarget) && arraysEqual(this.colTot, this.colTarget);
    if (this.success) {
      this.completed.emit(this.success);
    }

    this.grid[row][col] = value;
  }

  reset(): void {
    this.boxes.forEach(b => b.reset());
    this.init();
  }

  private init(): void {
    this.success = false;
    this.rowTot = zeros(this.size);
    this.colTot = zeros(this.size);

    this.grid = Array.from({ length: this.size }, () => zeros(this.size));

    do {
      this.rowTarget = zeros(this.size);
      this.colTarget = zeros(this.size);
      this.seed();
    } while (this.rowTarget.includes(0) || this.colTarget.includes(0));
  }

  private seed(): void {
    for (const r of this.range) {
      for (const c of this.range) {
        const mul = Math.floor(Math.random() * 2);
        this.rowTarget[r] += mul * 2 ** (this.size - c - 1);
        this.colTarget[c] += mul * 2 ** (this.size - r - 1);
      }
    }
  }

}
