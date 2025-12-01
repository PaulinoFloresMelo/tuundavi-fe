import { Term } from '@/terms/interfaces/term.interface';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'term-table',
  imports: [TermImagePipe, RouterLink],
  templateUrl: './term-table.html',
})
export class TermTable { 
  terms = input.required<Term[]>();
}
