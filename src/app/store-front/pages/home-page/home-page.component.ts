import { Component, inject } from '@angular/core';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';
import { TermsService } from '@/terms/services/terms.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { GetTermsService } from '@/terms/services/get-terms.service';
import { injectQuery } from '@tanstack/angular-query-experimental';


@Component({
  selector: 'app-home-page',
  imports: [TermCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  termsService      = inject(TermsService);
  paginationService = inject(PaginationService)

  getTerms          = inject(GetTermsService);

  termsQuery = injectQuery(() => 
    this.getTerms.termsQuery(
      this.paginationService.currentCategory(),
      this.paginationService.currentPage()
    )
  );
}
