import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  imports: [],
  templateUrl: './alert.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert { 

  private alertService = inject(AlertService);
  public message = this.alertService.message;

  public isShowAlert = this.alertService.isShowAlert;
  public typeAlert = this.alertService.typeAlert;

}
