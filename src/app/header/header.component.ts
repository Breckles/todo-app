import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Themes } from '../shared/themes.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  themeChanged = new EventEmitter<Themes>();
  @ViewChild('themeToggleButton', { static: true })
  private themeToggleButtonRef!: ElementRef;
  private themeToggleButtonEl!: HTMLButtonElement;

  constructor() {}

  ngOnInit(): void {
    this.themeToggleButtonEl = this.themeToggleButtonRef
      .nativeElement as HTMLButtonElement;
  }

  toggleTheme() {
    if (this.themeToggleButtonEl.classList.contains(Themes.darkTheme)) {
      this.themeToggleButtonEl.classList.remove(Themes.darkTheme);
      this.themeToggleButtonEl.classList.add(Themes.lightTheme);
      this.themeChanged.emit(Themes.lightTheme);
    } else {
      this.themeToggleButtonEl.classList.remove(Themes.lightTheme);
      this.themeToggleButtonEl.classList.add(Themes.darkTheme);
      this.themeChanged.emit(Themes.darkTheme);
    }
  }
}
