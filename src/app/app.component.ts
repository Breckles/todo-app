import { Component, OnInit } from '@angular/core';

import { Themes } from './shared/themes.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentTheme = Themes.darkTheme;

  ngOnInit(): void {}

  toggleTheme(theme: Themes) {
    this.currentTheme = theme;
  }
}
