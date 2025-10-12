import { Term } from '@/terms/interfaces/term.interface';
import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'term-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './term-card.component.html',
})
export class TermCardComponent { 
  term = input.required<Term>();

  imageUrl = computed(() => {
    return `http://localhost:3000/api/v1/terms/${
    this.term().imageUrl
    }`
  });
};
