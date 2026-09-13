import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bin-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    imports: []
})
export class HomeComponent {
  private router = inject(Router);

  play(size: number): void {
    this.router.navigate(['/play', size]).then();
  }
}
