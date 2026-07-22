import { TermAudioPipe } from '@/terms/pipes/term-audio.pipe';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { GetTermService } from '@/terms/services/get-term.service';
import { TermsService } from '@/terms/services/terms.service';
import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
// import { TermImageComponent} from "@/terms/components/term-image/term-image.component";

@Component({
  selector: 'app-term-page',
  imports: [
    // TermImageComponent
    TermAudioPipe,
    TermImagePipe
  ],
  templateUrl: './term-page.component.html',
})
export class TermPageComponent { 
   @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  getTermService = inject(GetTermService)
  
  termIdSlug     = this.activatedRoute.snapshot.params['idSlug'];

  term = this.getTermService.termQuery(this.termIdSlug)

  redirectEffect = effect( () => {
    if(this.term.isError()){
      this.router.navigate(['/admin/roles']);
    }
  })

  playAudio(): void {
    const audio = this.audioPlayerRef.nativeElement;
    // Reinicia desde el principio si ya estaba en curso
    audio.currentTime = 0;
    audio.play().catch(error => console.error('Error al reproducir:', error));
  }

}
