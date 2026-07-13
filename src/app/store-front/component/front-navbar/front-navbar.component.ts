import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KeyValuePipe } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';

import { Alert } from '@/shared/components/alert/alert-error';
import { AlertService } from '@/shared/components/alert/alert.service';

@Component({
  selector: 'front-navbar',
  imports: [ 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    KeyValuePipe,
    Alert
  ],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  alertService = inject(AlertService);
  authService = inject(AuthService);

  alertMessage = signal('');

  isUser(){
    if(!this.authService.data()){
      this.alertMessage.update(() => 'Es necesario autenticarse');
      this.alertService.showAlert(this.alertMessage(), 'error');
    }
    return
  }

  categories = {
    'adverbio': 'Adverbio',
    'animal': 'Animales',
    'color': 'Colores',
    'dayOfTheWeek': 'Días de la semana',
    'frequentVerb': 'Verbos frecuentes',
    'numberFromOneToHundred': 'Números 1-100',
    'schoolObject': 'Objetos escolares',
    'agriculture': 'Agricultura',
    'mood': 'Estados de ánimo',
    'familyAndPeople': 'Familiares y gente',
    'fruitsAndVegetables': 'Frutas y vegetales',
    'householdObjects': 'Objetos domesticos',
    'personalPronouns': 'Pronombres personales',
    'weatherAndSeasonsOfTheYear': 'Clima y estaciones del año',
    'foodAndDrink': 'Comidas y bebidas',
  }

}
