import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { TermTable } from '@/terms/components/term-table/term-table';
import { TermsService } from '@/terms/services/terms.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { TermDetails } from '../term-admin-page/term-details/term-details';

@Component({
  selector: 'app-terms-admin-page',
  imports: [TermTable, PaginationComponent],
  templateUrl: './terms-admin-page.html',
})
export class TermsAdminPage {
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
