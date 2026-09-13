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

  readonly commitSha = environment.commitSha;
  readonly shortSha = environment.shortSha;
  readonly commitUrl = this.commitSha && this.commitSha !== 'dev'
    ? `https://github.com/LoicViennois/The-Binary-Game/commit/${this.commitSha}`
    : 'https://github.com/LoicViennois/The-Binary-Game';
}

