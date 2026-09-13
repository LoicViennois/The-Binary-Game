import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'bin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {

  constructor() {
  }

}
