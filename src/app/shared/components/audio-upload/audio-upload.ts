import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileSizePipe } from './file-size.pipe';

const baseUrl = environment.baseUrl

interface UploadResponse {
  success: boolean;
  filename?: string;
  url?: string;
  message?: string;
}

@Component({
  selector: 'app-audio-upload',
  imports: [FileSizePipe],
  templateUrl: './audio-upload.html',
  styleUrl:'./audio-upload.css'
})

export class AudioUpload {
  http = inject(HttpClient)
  selectedFile: File | null = null;
  isUploading = false;
  uploadResponse: UploadResponse | null = null;
  progress = 0;


  // Capturar el archivo seleccionado
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
        alert('El archivo excede el límite de 20 MB');
        input.value = '';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.uploadResponse = null;
    }
  }

  // Subir el archivo al backend
  uploadAudio(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.progress = 0;
    this.uploadResponse = null;

    // Construir FormData
    const formData = new FormData();
    formData.append('audio', this.selectedFile, this.selectedFile.name);

    // Hacer la petición POST
    this.http.post<any>(
      `${baseUrl}/audio/upload`,
      formData,
      {
        reportProgress: true,  // Para obtener el progreso
        observe: 'events'      // Para escuchar eventos de progreso
      }
    ).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Calcular el progreso de subida
          const percentDone = Math.round(100 * event.loaded / (event.total ?? 1));
          this.progress = percentDone;
        } else if (event.type === HttpEventType.Response) {
          // Subida completada
          const body = event.body;
          this.uploadResponse = {
            success: true,
            filename: body.filename || this.selectedFile?.name,
            url: body.url,
            message: 'Audio subido correctamente'
          };
          this.isUploading = false;
          this.selectedFile = null; // Limpiar después de subir
          // Resetear el input file (opcional)
          const input = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (input) input.value = '';
        }
      },
      error: (error) => {
        console.error('Error al subir audio:', error);
        this.uploadResponse = {
          success: false,
          message: error.error?.error || 'Error al subir el archivo'
        };
        this.isUploading = false;
      }
    });
  }
}
