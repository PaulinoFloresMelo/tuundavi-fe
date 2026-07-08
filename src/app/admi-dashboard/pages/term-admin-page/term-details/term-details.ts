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
import { TermsService } from '@/terms/services/terms.service';
import { TermAudioPipe } from '@/terms/pipes/term-audio.pipe';
import { FileSizePipe } from './file-size.pipe';

@Component({
  selector: 'term-details',
  imports: [
    TermImagePipe,
    TermAudioPipe,
    ReactiveFormsModule,
    KeyValuePipe,
    Alert,
    FileSizePipe
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
  
  imageFileList: FileList | undefined = undefined;
  selectedFile: File | null = null;
  
  alertMessage = signal('');
  tempImage    = signal('');
  isUploading = false;

  termForm = this.fb.group({
    content: ['', Validators.required],
    example: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', ],
    audio: ['', ],
    userId: [0, ],
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
    if (!this.termForm.valid ) return;

    const formValue = this.termForm.value;
    const keyState = formValue.category?.toString() ?? '';

    const termLike: Partial<Term> = {...(formValue as any), }

    if ( this.term().id === 'new'){
      
      if(this.imageFileList === undefined || this.imageFileList === null){
        this.alertMessage.update(() => 'Falta seleccionar la imagen');
        this.alertService.showAlert(this.alertMessage(), 'error');
        return
      }

      if(this.selectedFile === null || this.selectedFile === undefined){
        this.alertMessage.update(() => 'Falta seleccionar el audio');
        this.alertService.showAlert(this.alertMessage(), 'error');
        return
      }

      this.createTerm.mutate({
        term: formValue as any, 
        imageFile: this.imageFileList,
        audioFile: this.selectedFile,
        userId: 1
      }, {
        onSuccess: (data) => {
          console.log(data);
          this.alertMessage.update( ()=> 'Datos actualizados correctamente' )
          this.alertService.showAlert(this.alertMessage(), 'success')
          // this.router.navigate(['/admin/organizations']);
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
        audioFile: this.selectedFile
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
        this.selectedFile = null;
        return;
      }

      // Validar tamaño (ej. 20 MB)
      const maxSize = 20 * 1024 * 1024; // 20 MB
      if (file.size > maxSize) {
        alert('El archivo excede el límite de 2 MB');
        input.value = '';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
    }
  }
  
 }
