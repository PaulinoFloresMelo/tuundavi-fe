import { Term } from '@/terms/interfaces/term.interface';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { KeyValuePipe } from '@angular/common';
import { AlertService } from '@/shared/components/alert/alert.service';
import { Alert } from '@/shared/components/alert/alert-error';
import { CreateTermService } from '@/terms/services/create-term.service';
import { Router } from '@angular/router';
import { UpdateTermService } from '@/terms/services/update-term.service';
import { firstValueFrom } from 'rxjs';
import { TermsService } from '@/terms/services/terms.service';
import { AudioUpload } from '@/shared/components/audio-upload/audio-upload';
import { TermAudioPipe } from '@/terms/pipes/term-audio.pipe';

@Component({
  selector: 'term-details',
  imports: [
    TermImagePipe,
    TermAudioPipe,
    ReactiveFormsModule,
    KeyValuePipe,
    Alert,
    AudioUpload
  ],
  templateUrl: './term-details.html',
})
export class TermDetails {
  term = input.required<Term>();

  fb = inject(FormBuilder);
  router = inject(Router);

  alertService = inject(AlertService);
  termsService = inject(TermsService)
  createTerm   = inject(CreateTermService);
  updateTerm   = inject(UpdateTermService);
  
  alertMessage = signal('');
  imageFileList: FileList | undefined = undefined;
  tempImage    = signal('');

  termForm = this.fb.group({
    content: ['', Validators.required],
    example: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  })

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

  ngOnInit(): void {
    this.setFormValue(this.term());
    console.log(this.term());
    
  }

  setFormValue(formLike: Partial<Term>){
    this.termForm.reset(formLike as any);
  }

  async onSubmit(){
    
    this.termForm.markAllAsTouched();

    console.log(this.termForm.value);
    
    
    if ( this.termForm.pristine ) return;
    // if (!this.termForm.valid ) return;

    const {...formValue} = this.termForm.value;
    const keyState = formValue.category?.toString() ?? '';
    console.log('hola');

    const termLike: Partial<Term> = {...(formValue as any), }

    if ( this.term().id === 'new'){
      const term = await firstValueFrom(
        this.termsService.createTerm(termLike, this.imageFileList)
      )

    } else {
      // console.log('no es new');
      // this.termsService.updateTerm(
      //   this.term().id,
      //   termLike,
      //   this.imageFileList
      // );
      // console.log('fin no es new');
      this.updateTerm.mutate({id: this.term().id, term: formValue as any, imageFile: this.imageFileList}, {
        onSuccess: (data) => {
          console.log(data);
          this.alertMessage.update( ()=> 'Datos actualizados correctamente' )
          this.alertService.showAlert(this.alertMessage(), 'success')
          
          this.termForm.markAsPristine();
        },
        onError: (error) =>{
          this.alertMessage.update(() => error.message);
          this.alertService.showAlert(this.alertMessage(), 'error');
        }
      })
    }
  }

  onFileChanged( event: Event){
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    const imageUrl = Array.from(fileList ?? []).map( (file) => 
      URL.createObjectURL(file)
    );

    this.tempImage.set(imageUrl[0])
  }
  
 }
