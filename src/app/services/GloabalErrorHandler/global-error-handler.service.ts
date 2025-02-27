import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ErrorModalComponent } from 'src/app/utils/component/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(public dialog: MatDialog, private translate: TranslateService ) { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) { return; }
    this.translate.get('descError').subscribe((translate)=> {
      const alert = { description: translate, type: 'Error' }
      this.dialog.open(ErrorModalComponent, { data: alert, maxWidth:'20vw' });
    })

  }
}
