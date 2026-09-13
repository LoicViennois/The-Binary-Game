import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bin-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.less']
})
export class BoxComponent implements OnInit {
  @Input() value: number;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<number>();

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.value = 0;
  }

  switch(): void {
    this.value = this.value ? 0 : 1;
    this.valueChange.emit(this.value);
  }

}
