import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
    selector: 'bin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [NgIf, RouterLink, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);

  form: UntypedFormGroup;

  get loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  get username(): string {
    return this.authService.player.name;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*$/)
      ]],
    });
  }

  async onSubmit(): Promise<void> {
    await this.authService.login(this.form.value.username);
    this.router.navigate(['/home']).then();
  }

}
