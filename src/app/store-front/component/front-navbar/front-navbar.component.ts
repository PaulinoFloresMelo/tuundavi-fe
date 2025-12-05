import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [ RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent { 
  authService = inject(AuthService);

  semantics = [
    "Adverbio",
    "Animales",
    "Colores",
    "Dias de la semana",
    "Verbos Frecuentes",
    "Numeros 1-100",
    "Objetos escolares",
    "Agricultura",
    "Estados de ánimo",
    "Familiares y gente",
    "Frutas y vegetales",
    "Objetos domesticos",
    "Pronombre personales",
    "Clima y estaciones del año",
    "Comidas y bebidas",
  ]

}
