import { computed, Injectable, signal } from '@angular/core';

type TypeAlert = 'error' | 'warning' | 'info' | 'success'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _isShowAlert = signal<boolean>(false);
  private _typeAlert = signal<TypeAlert>('success');
  
  public message = signal<string>('');
  
  isShowAlert = computed(() => this._isShowAlert());
  typeAlert = computed(() => this._typeAlert());

  showAlert(message: string, type: TypeAlert) {
    
    this._isShowAlert.update(() => true);
    this._typeAlert.set(type);
    this.message.set(message);
    
    setTimeout(() => {
      this._isShowAlert.update(() => false);
      this.message.set('');
      this._typeAlert.set('success');
    }, 2500);

  }
  
}

