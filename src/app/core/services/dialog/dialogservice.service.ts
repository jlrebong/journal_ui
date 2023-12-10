import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private isDialogOpen = false;
  private subject = new Subject<any>();

  setIsDialogOpen() {
    this.isDialogOpen = !this.isDialogOpen;
    this.subject.next(this.isDialogOpen)
  }

  getIsDialogOpen() {
    return this.subject.asObservable();
  }
}
