import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { TermCardComponent } from "@/terms/components/term-card/term-card.component";
import { TermsService } from '@/terms/services/terms.service';

@Component({
  selector: 'app-category-page',
  imports: [TermCardComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
  
  route  = inject(ActivatedRoute);
  termsService = inject(TermsService)
  
  category = toSignal(this.route.params.pipe(map(( { category }) => category )));
  
  termsResource = rxResource({
    params: () => ({ category: this.category() }),
    stream: ({ params }) => {
      return this.termsService.getTerms({
        category: params.category,
      });
    }
  })
}
