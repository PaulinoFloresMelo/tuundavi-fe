import { Term } from '@/terms/interfaces/term.interface';
import { TermAudioPipe } from '@/terms/pipes/term-audio.pipe';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { SlicePipe } from '@angular/common';
import { Component, computed, ElementRef, input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'term-card',
  imports: [
    RouterLink, 
    TermImagePipe,
    TermAudioPipe
  ],
  templateUrl: './term-card.component.html',
})

export class TermCardComponent {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  term = input.required<Term>();
  imageUrl = computed(() => {
    // return `${baseUrl}/images/${
    return `${
      // this.term().images[0] si es un arreglo
      this.term().imageUrl
    }`;
  });

  playAudio(): void {
    const audio = this.audioPlayerRef.nativeElement;
    // Reinicia desde el principio si ya estaba en curso
    audio.currentTime = 0;
    audio.play().catch(error => console.error('Error al reproducir:', error));
  }
};
