import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { HighScoresComponent } from './components/game/high-scores/high-scores.component';
import { BoxComponent } from './components/game/box/box.component';
import { GridComponent } from './components/game/grid/grid.component';
import { GameComponent } from './views/game/game.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { HighScoresService } from './services/high-scores.service';
import { TimerService } from './services/timer.service';
import { ModalContainerComponent } from './components/modals/modal-container/modal-container.component';
import { AboutComponent } from './components/modals/about/about.component';


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppComponent,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModalModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        HighScoresComponent,
        BoxComponent,
        GridComponent,
        GameComponent,
        ModalContainerComponent,
        AboutComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        HighScoresService,
        TimerService,
    ]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }
}

