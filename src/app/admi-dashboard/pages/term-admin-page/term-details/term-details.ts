import { Term } from '@/terms/interfaces/term.interface';
import { Component, inject, input } from '@angular/core';
import { TermImageComponent } from "@/terms/components/term-image/term-image.component";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'term-details',
  imports: [TermImageComponent],
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
