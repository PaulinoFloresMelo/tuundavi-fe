import { Term } from '@/terms/interfaces/term.interface';
import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { AlertService } from '@/shared/components/alert/alert.service';
import { Alert } from '@/shared/components/alert/alert-error';
import { CreateTermService } from '@/terms/services/create-term.service';
import { Router } from '@angular/router';
import { UpdateTermService } from '@/terms/services/update-term.service';
import { TermsService } from '@/terms/services/terms.service';
import { TermAudioPipe } from '@/terms/pipes/term-audio.pipe';
import { FileSizePipe } from './file-size.pipe';
import { GetVariantsService } from 'src/app/variants/services/get-variants.service';
import { AuthService } from '@/auth/services/auth.service';
// import { FormErrorFieldset } from '@/shared/components/form-error-fieldset/form-error-fieldset';
import { FormUtils } from '@/utils/form-utils';

@Component({
  selector: 'term-details',
  imports: [
    TermImagePipe,
    TermAudioPipe,
    ReactiveFormsModule,
    KeyValuePipe,
    Alert,
    FileSizePipe,
    // FormErrorFieldset,
    NgClass
  ],
  templateUrl: './term-details.html',
})
export class TermDetails {
  term = input.required<Term>();

  fb = inject(FormBuilder);
  router = inject(Router);
  formUtils = FormUtils;

  alertService = inject(AlertService);
  authService = inject(AuthService)
  termsService = inject(TermsService);
  variantsService = inject(GetVariantsService);
  createTerm   = inject(CreateTermService);
  updateTerm   = inject(UpdateTermService);
  
  imageFileList: FileList | undefined = undefined;
  audioFile: File | null = null;
  
  alertMessage = signal('');
  tempImage    = signal('');
  isNew = linkedSignal(() => +this.term().id!==0 || this.term().id!=='0');

  termForm = this.fb.group({
    content: ['', Validators.required],
    meaning: ['', Validators.required],
    example: ['', Validators.required],
    translationExample: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    audio: ['',  Validators.required],
    userId: [0, ],
    variantId: [0, Validators.required],
  })

  categories = {
    'adverbio': 'Adverbio',
    'animal': 'Animales',
    'color': 'Colores',
    'dayoftheweek': 'Días de la semana',
    'frequentverb': 'Verbos frecuentes',
    'numberfromonetohundred': 'Números 1-100',
    'schoolobject': 'Objetos escolares',
    'agriculture': 'Agricultura',
    'mood': 'Estados de ánimo',
    'familyandpeople': 'Familiares y gente',
    'fruitsandvegetables': 'Frutas y vegetales',
    'householdobjects': 'Objetos domesticos',
    'personalpronouns': 'Pronombres personales',
    'weatherandseasonsoftheyear': 'Clima y estaciones del año',
    'foodanddrink': 'Comidas y bebidas',
  }
  
  user = this.authService.userProfileQuery.data

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
    if (!this.termForm.valid ) return;

    const formValue = this.termForm.value;
    const variantId = formValue.variantId ? +formValue.variantId : 0;
    
    const termLike: Partial<Term> = {
      ...(formValue as any),
      variantId:variantId,
      userId: this.user()?.user ? this.user()?.user.userId: 0
    }  

    if ( this.term().id === 'new'){
      
      if(this.imageFileList === undefined || this.imageFileList === null){
        this.alertMessage.update(() => 'Falta seleccionar la imagen');
        this.alertService.showAlert(this.alertMessage(), 'error');
        return
      }

      if(this.audioFile === null || this.audioFile === undefined){
        this.alertMessage.update(() => 'Falta seleccionar el audio');
        this.alertService.showAlert(this.alertMessage(), 'error');
        return
      }

      this.createTerm.mutate({
        term: termLike as any, 
        imageFile: this.imageFileList,
        audioFile: this.audioFile,
      }, {
        onSuccess: (data) => {
          this.alertMessage.update( ()=> 'Datos actualizados correctamente' )
          this.alertService.showAlert(this.alertMessage(), 'success')
          this.router.navigate(['/admin/terms', data.id]);
          
          this.termForm.markAsPristine();
        },
        onError: (error) =>{
          this.alertMessage.update(() => error.message);
          this.alertService.showAlert(this.alertMessage(), 'error');
        }
      })
    } else {
      this.updateTerm.mutate({
        id: this.term().id, 
        term: formValue as any, 
        imageFile: this.imageFileList,
        audioFile: this.audioFile
      }, {
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar que sea un archivo de audio
      if (!file.type.startsWith('audio/')) {
        alert('Por favor selecciona un archivo de audio válido');
        input.value = '';
        this.audioFile = null;
        return;
      }

      // Validar tamaño (5 MB)
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        alert('El archivo excede el límite de 5 MB');
        input.value = '';
        this.audioFile = null;
        return;
      }

      this.audioFile = file;
    }
  }
  
 }
