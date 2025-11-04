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
  
  activatedRoute = inject(ActivatedRoute)
  termService    = inject(TermsService)
  
  termIdSlug         = this.activatedRoute.snapshot.params['idSlug'];
  
  termResource = rxResource({
    params: () => ({ idSlug: this.termIdSlug }),
    stream: ({ params }) => {
      return this.termService.getTermById(params.idSlug)
    }
  })
}
