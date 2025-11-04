import { Component, inject } from '@angular/core';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';
import { TermsService } from '@/terms/services/terms.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [TermCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  termsService      = inject(TermsService);
  paginationService = inject(PaginationService)
  
  termsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.termsService.getTerms({
        offset: params.page * 9,
      });
    }
  })

}
