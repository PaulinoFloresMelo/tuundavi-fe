import { Component, inject, linkedSignal } from '@angular/core';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';
import { TermsService } from '@/terms/services/terms.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { GetTermsService } from '@/terms/services/get-terms.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';


@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    KeyValuePipe,
    TermCardComponent, 
    PaginationComponent
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  activatedRoute = inject(ActivatedRoute);

  termsService      = inject(TermsService);
  paginationService = inject(PaginationService)
  getTerms          = inject(GetTermsService);

  termsQuery = injectQuery(() => 
    this.getTerms.termsQuery(
      this.paginationService.currentCategory(),
      this.paginationService.letter(),
      this.paginationService.currentPage(),
    )
  );

  alphabet = {
    'a' : 'A',
    'b' : 'B',
    'c' : 'C',
    'd' : 'D',
    'e' : 'E',
    'f' : 'F',
    'g' : 'G',
    'h' : 'H',
    'i' : 'I',
    'j' : 'J',
    'k' : 'K',
    'l' : 'L',
    'm' : 'M',
    'n' : 'N',
    'ñ' : 'Ñ',
    'o' : 'O',
    'p' : 'P',
    'q' : 'Q',
    'r' : 'R',
    's' : 'S',
    't' : 'T',
    'u' : 'U',
    'v' : 'V',
    'w' : 'W',
    'x' : 'X',
    'y' : 'Y',
    'z' : 'Z',
  }

  private _category = toSignal(
    this.activatedRoute.queryParamMap.pipe(
        map( params => (params.get('category') ? params.get('category')! : '' )),
        // map(() => ())
    ),
    {
    initialValue: '',
    }
  )

  public category = linkedSignal(this._category);
}
