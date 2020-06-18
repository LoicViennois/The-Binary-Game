import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'bin-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.less']
})
export class BoxComponent implements OnInit {
  @Input() value: number
  @Input() disabled = false
  @Output() valueChange = new EventEmitter<number>()

  ngOnInit () {
    this.reset()
  }

  reset() {
    this.value = 0
  }

  switch () {
    this.value = this.value ? 0 : 1
    this.valueChange.emit(this.value)
  }

}
