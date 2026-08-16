import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  afficherSucces(message: string): void {
    this.toastSubject.next({ message, type: 'success' });
    setTimeout(() => this.toastSubject.next(null), 3000);
  }

  afficherErreur(message: string): void {
    this.toastSubject.next({ message, type: 'error' });
    setTimeout(() => this.toastSubject.next(null), 3000);
  }
}
