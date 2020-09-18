import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { HighScoresService } from '../../../services/high-scores.service';


@Component({
  selector: 'bin-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit, AfterViewInit {
  @Input() game: number;

  constructor(public highScoresService: HighScoresService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.highScoresService.get(this.game);
  }

}
