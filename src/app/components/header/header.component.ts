import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SlicePipe } from '@angular/common';


@Component({
    selector: 'bin-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    imports: [RouterLink, SlicePipe]
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);


  get onLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  get username(): string {
    return this.authService.player ? this.authService.player.name : '';
  }

  ngOnInit(): void {
    return;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']).then();
  }

}
