import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KeyValuePipe } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';

import { Alert } from '@/shared/components/alert/alert-error';
import { AlertService } from '@/shared/components/alert/alert.service';
import { SearchTermService } from '@/terms/services/search-term.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TermCardComponent } from '@/terms/components/term-card/term-card.component';

@Component({
  selector: 'front-navbar',
  imports: [ 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    KeyValuePipe,
    Alert,
    TermCardComponent
  ],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  alertService = inject(AlertService);
  authService = inject(AuthService);
  searchTermService = inject(SearchTermService);

  alertMessage = signal('');
  
  grammaticalCategory = {
    'animal': 'Animales',
    'color': 'Colores',
    'dayoftheweek': 'Días de la semana',
    'numbers': 'Números',
    'schoolobject': 'Objetos escolares',
    'agriculture': 'Agricultura',
    'foodanddrink': 'Comidas y bebidas',
    'weatherandseasonsoftheyear': 'Clima y estaciones del año',
    'householdobjects': 'Objetos domesticos',
    'fruitsandvegetables': 'Frutas y vegetales',
    'familyandpeople': 'Familiares y gente',
    'mood': 'Estados de ánimo',
  }
  
  semanticCategory = {
    'adverbio': 'Adverbio',
    'frequentverb': 'Verbos frecuentes',
    'personalpronouns': 'Pronombres personales',
  }

  currentTerm = signal('');

  searchQuery = injectQuery(() =>
    this.searchTermService.searchTermQuery(this.currentTerm())
  );

  onSearch(term: string) {
    if (this.currentTerm() !== term) {
      // Si cambia el término, actualizamos la signal → el query se re-ejecuta automáticamente
      this.currentTerm.set(term);
    } else {
      // Si es el mismo término, forzamos refetch manual
      this.searchQuery.refetch();
    }
  }

  resetCurrentTerm(){
    this.currentTerm.set('')
  }

  constructor() {
    // Efecto para manejar el error
    effect(() => {
      const error = this.searchQuery.error();
      if (error) {
        console.log(error.message);
        
        this.alertMessage.update(() => error.message);
        this.alertService.showAlert(this.alertMessage(), 'error');
      }
    });
  }
}
