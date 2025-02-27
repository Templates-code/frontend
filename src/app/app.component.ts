import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { TranslateService } from '@ngx-translate/core';

export interface Languaje{
  code:string,
  name:string,
  flagCode:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'template-angular';
}
