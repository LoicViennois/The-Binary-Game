import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'bin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  readonly shortSha = environment.shortSha;
  readonly commitSha = environment.commitSha;
  readonly commitUrl = this.commitSha && this.commitSha !== 'dev'
    ? `https://github.com/LoicViennois/The-Binary-Game/commit/${this.commitSha}`
    : 'https://github.com/LoicViennois/The-Binary-Game';
}
