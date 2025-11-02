import { TermsService } from '@/terms/services/terms.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TermCarouselComponent } from "@/terms/components/term-carousel/term-carousel.component";

@Component({
  selector: 'app-term-page',
  imports: [TermCarouselComponent],
  templateUrl: './term-page.component.html',
})
export class TermPageComponent { 
  
  activatedRouted = inject(ActivatedRoute)
  termService     = inject(TermsService)
  
  termId          = this.activatedRouted.snapshot.params['idSlug'];
  
  termResource = rxResource({
    params: () => ({ idSlug: this.termId }),
    stream: ({ params }) => {
      return this.termService.getTermById(params.idSlug)
    }
  })
}
