import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme/theme.service';


export interface Languaje{
  code:string,
  name:string,
  flagCode:string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  languajes: Languaje[] = [
    { code:'es', name:'spanish', flagCode:'es'},
    { code:'en', name:'english', flagCode:'us'}
  ];
  currentLng:Languaje;
  constructor(private theme: ThemeService, private translate: TranslateService){

    const lngList = this.languajes.map(x => x.code);
    const browserLng: string = navigator.language || navigator.language[0];
    const lng = this.languajes.filter((lng:Languaje)=> lng.code == browserLng.split('-')[0]);
    this.currentLng = lng.length>0 ? lng[0] : this.languajes[0];
    this.translate.addLangs(lngList);
    this.translate.setDefaultLang(this.currentLng.code);
    this.translate.use(this.currentLng.code);
  }

  toggleTheme($event:Event){
    const toggleTheme= ($event.target) as HTMLInputElement;
    this.theme.toggleTheme(toggleTheme.checked ? 'light-theme' : 'dark-theme');
  }

  setLng(lng:Languaje){
    this.translate.use(lng.code);
    this.currentLng = lng;
  }


}
