import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard  {
  private authService = inject(AuthService);
  private router = inject(Router);


  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']).then();
    return false;
  }
}
