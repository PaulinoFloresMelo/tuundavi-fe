interface UploadResponse {
  success: boolean;
  filename?: string;      // Solo en éxito
  url?: string;           // Solo en éxito
  message?: string;       // Éxito o error
  size?: number;          // Opcional
  type?: string;          // Opcional
}