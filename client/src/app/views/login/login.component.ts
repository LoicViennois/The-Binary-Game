import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'bin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor (private authService: AuthService,
               private fb: FormBuilder,
               private router: Router) {
  }

  ngOnInit () {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*$/)
      ]],
    })
  }

  async onSubmit () {
    await this.authService.login(this.form.value.username)
    this.router.navigate(['/home']).then()
  }

  get loggedIn(): boolean {
    return this.authService.loggedIn()
  }

  get username(): string {
    return this.authService.player.name
  }

}
