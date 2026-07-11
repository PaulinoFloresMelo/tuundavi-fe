import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'front-navbar',
  imports: [ 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    KeyValuePipe
  ],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent { 
  authService = inject(AuthService);

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
