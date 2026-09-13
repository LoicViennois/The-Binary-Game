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
  readonly gitSha = environment.gitSha;
  readonly shortGitSha = environment.gitSha && environment.gitSha !== 'dev'
    ? environment.gitSha.slice(0, 7)
    : (environment.gitSha || 'dev');
  readonly commitUrl = environment.gitSha && environment.gitSha !== 'dev'
    ? `https://github.com/LoicViennois/The-Binary-Game/commit/${environment.gitSha}`
    : 'https://github.com/LoicViennois/The-Binary-Game';
}
