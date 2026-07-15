import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { TermTable } from '@/terms/components/term-table/term-table';
import { TermsService } from '@/terms/services/terms.service';
import { Component, inject } from '@angular/core';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { injectQuery } from '@tanstack/angular-query-experimental';
import { GetTermsService } from '@/terms/services/get-terms.service';

@Component({
  selector: 'app-terms-admin-page',
  imports: [TermTable, PaginationComponent],
  templateUrl: './terms-admin-page.html',
})
export class TermsAdminPage {
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
