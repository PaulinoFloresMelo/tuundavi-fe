import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { TermCardComponent } from "@/terms/components/term-card/term-card.component";
import { TermsService } from '@/terms/services/terms.service';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-category-page',
  imports: [TermCardComponent, PaginationComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
  
  route  = inject(ActivatedRoute);
  termsService = inject(TermsService)
  paginationService = inject(PaginationService)

  category = toSignal(this.route.params.pipe(map(( { category }) => category )));
  
  termsResource = rxResource({
    params: () => ({ 
      category: this.category(),
      page: this.paginationService.currentPage() -1  
    }),
    stream: ({ params }) => {
      return this.termsService.getTerms({
        category: params.category,
        offset: params.page * 9,
      });
    }
  })
}
