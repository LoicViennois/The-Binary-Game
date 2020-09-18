import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { GameComponent } from './views/game/game.component';
import { AuthGuard } from './services/auth.guard';
import { ModalContainerComponent } from './components/modals/modal-container/modal-container.component';
import { CopyrightComponent } from './components/modals/copyright/copyright.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'copyright',
    component: ModalContainerComponent,
    data: { component: CopyrightComponent },
    outlet: 'modal'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'play/:size',
    component: GameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
