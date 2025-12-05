import { TermsService } from '@/terms/services/terms.service';
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TermDetails } from './term-details/term-details';

@Component({
  selector: 'app-term-admin-page',
  imports: [TermDetails],
  templateUrl: './term-admin-page.html',
})
export class TermAdminPage { 
  
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  termService = inject(TermsService);

  termId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  )

  termResource = rxResource({
    params: () => ({ id: this.termId() }),
    stream: ({ params }) => {
      return this.termService.getTermById(params.id)
    }
  })

  redirectEffect = effect(() => {
    if ( this.termResource.error() ) {
      this.router.navigateByUrl('/admin/terms');
    }
  });
  
}
