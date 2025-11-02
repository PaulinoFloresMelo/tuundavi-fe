import { Term } from '@/terms/interfaces/term.interface';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'term-card',
  imports: [RouterLink, SlicePipe, TermImagePipe],
  templateUrl: './term-card.component.html',
})
export class TermCardComponent { 
  term = input.required<Term>();
  imageUrl = computed(() => {
    return `${baseUrl}/images/${this.term().imageUrl}`
  });
};
