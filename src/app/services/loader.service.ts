import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading: boolean = false;
  public isLoading = new BehaviorSubject(false);

  constructor(private zone: NgZone) {}

  setLoading(loading: boolean) {
    this.zone.run(() => {
      this.loading = loading;
      this.isLoading.next(loading);
    });
  }
}