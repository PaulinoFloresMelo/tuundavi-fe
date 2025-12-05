import { Term } from '@/terms/interfaces/term.interface';
import { Component, inject, input } from '@angular/core';
import { TermCarouselComponent } from "@/terms/components/term-carousel/term-carousel.component";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'term-details',
  imports: [TermCarouselComponent],
  templateUrl: './term-details.html',
})
export class TermDetails {
  term = input.required<Term>();

  fb = inject(FormBuilder);

  termForm = this.fb.group({
    content: ['', Validators.required],
    example: ['', Validators.required],
    image: ['', Validators.required],
  })
 }
