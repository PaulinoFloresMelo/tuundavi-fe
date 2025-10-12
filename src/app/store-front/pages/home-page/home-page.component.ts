import { Component, inject } from '@angular/core';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';
import { TermsService } from '@/terms/services/terms.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [TermCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  termsService = inject(TermsService)
  
  termsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.termsService.getTerms({
        limit: 1,
        category: 'cocina',
      });
    }
  })

 }
