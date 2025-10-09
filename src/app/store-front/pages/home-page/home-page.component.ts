import { Component } from '@angular/core';
import { TermCardComponent } from '../../component/term-card/term-card.component';

@Component({
  selector: 'app-home-page',
  imports: [TermCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
