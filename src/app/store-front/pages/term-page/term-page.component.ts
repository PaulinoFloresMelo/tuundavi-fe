import { TermsService } from '@/terms/services/terms.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TermImageComponent} from "@/terms/components/term-image/term-image.component";

@Component({
  selector: 'app-term-page',
  imports: [TermImageComponent],
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
