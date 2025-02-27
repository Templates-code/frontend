import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const THEME_TOKEN = new InjectionToken<string>('');

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeObserver: BehaviorSubject<string>= new BehaviorSubject<string>(this.initialTheme);

  constructor(@Optional() @Inject(THEME_TOKEN) private initialTheme: string = 'light-theme') {
    this.toggleTheme(this.initialTheme);
   }

  getThemeObserve(): Observable<string> {
    return this.themeObserver.asObservable();
  }

  toggleTheme(theme:string){
    this.themeObserver.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
