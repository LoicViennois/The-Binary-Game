import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';

import { HighScoresService } from '../../../services/high-scores.service';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';


@Component({
    selector: 'bin-high-scores',
    templateUrl: './high-scores.component.html',
    styleUrls: ['./high-scores.component.css'],
    imports: [NgFor, AsyncPipe, DatePipe]
})
export class HighScoresComponent implements OnInit, AfterViewInit {
  highScoresService = inject(HighScoresService);

  @Input() game: number;

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit(): void {
    this.highScoresService.setGame(this.game);
  }

}
