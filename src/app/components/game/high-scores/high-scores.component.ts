import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { HighScoresService } from '../../../services/high-scores.service';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';


@Component({
    selector: 'bin-high-scores',
    templateUrl: './high-scores.component.html',
    styleUrls: ['./high-scores.component.css'],
    imports: [NgFor, AsyncPipe, DatePipe]
})
export class HighScoresComponent implements OnInit, AfterViewInit {
  @Input() game: number;

  constructor(public highScoresService: HighScoresService) {
  }

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit(): void {
    this.highScoresService.setGame(this.game);
  }

}
