import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'bin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor (public authService: AuthService,
               private router: Router) {
  }

  ngOnInit () {
  }

  get onLoginPage (): boolean {
    return this.router.url.startsWith('/login')
  }

  get username (): string {
    return this.authService.player ? this.authService.player.name : ''
  }

  async logout () {
    await this.authService.logout()
    this.router.navigate(['/login']).then()
  }

}
