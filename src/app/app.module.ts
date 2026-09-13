import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ConnectedPlayersComponent } from './components/connected-players/connected-players.component';
import { ChatComponent } from './components/chat/chat.component';
import { HighScoresComponent } from './components/game/high-scores/high-scores.component';
import { MessageComponent } from './components/message/message.component';
import { BoxComponent } from './components/game/box/box.component';
import { GridComponent } from './components/game/grid/grid.component';
import { GridOpponentComponent } from './components/game/grid-opponent/grid-opponent.component';
import { GameComponent } from './views/game/game.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { PlayersService } from './services/players.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { HighScoresService } from './services/high-scores.service';
import { MessagesService } from './services/messages.service';
import { MultiplayerService } from './services/multiplayer.service';
import { TimerService } from './services/timer.service';
import { WebsocketService } from './services/websocket.service';
import { ModalContainerComponent } from './components/modals/modal-container/modal-container.component';
import { AboutComponent } from './components/modals/about/about.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        ConnectedPlayersComponent,
        ChatComponent,
        HighScoresComponent,
        MessageComponent,
        BoxComponent,
        GridComponent,
        GridOpponentComponent,
        GameComponent,
        ConfirmModalComponent,
        AlertModalComponent,
        ModalContainerComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        NgbModalModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        AuthGuard,
        AuthService,
        GameService,
        HighScoresService,
        MessagesService,
        MultiplayerService,
        TimerService,
        PlayersService,
        WebsocketService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
