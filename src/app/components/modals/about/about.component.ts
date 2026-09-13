import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'bin-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.less']
})
export class AboutComponent {
  activeModal = inject(NgbActiveModal);

  readonly gitSha = environment.gitSha;
  readonly shortGitSha = environment.gitSha && environment.gitSha !== 'dev'
    ? environment.gitSha.slice(0, 7)
    : (environment.gitSha || 'dev');
  readonly commitUrl = environment.gitSha && environment.gitSha !== 'dev'
    ? `https://github.com/LoicViennois/The-Binary-Game/commit/${environment.gitSha}`
    : 'https://github.com/LoicViennois/The-Binary-Game';
}

