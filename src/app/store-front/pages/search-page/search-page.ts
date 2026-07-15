import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';
import { Term, TermsResponse } from '@/terms/interfaces/term.interface';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [TermCardComponent, PaginationComponent],
  templateUrl: './search-page.html',
})
export class SearchPage {
  terms = input.required<TermsResponse>()
  paginationService = inject(PaginationService);

}
