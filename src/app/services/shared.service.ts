import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {
    this.userLoggedIn.next(false);
  }



  private sharedDataSubject = new BehaviorSubject<any>(null);

  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  getSharedData() {
    return this.sharedDataSubject.asObservable();
  }

  //--->
  private shareSubject = new BehaviorSubject<any>(null);

  setSData(data: any) {
    this.shareSubject.next(data);
  }

  getSData() {
    return this.shareSubject.asObservable();
  }

  private messageSource = new BehaviorSubject<any>(null);

  getfcmtoken = this.messageSource.asObservable();

  setfcmtoken(message: any) {
    this.messageSource.next(message);
  }


  private resetUserSubject = new Subject<void>();

  resetUser$ = this.resetUserSubject.asObservable();

  triggerResetUser() {
    this.resetUserSubject.next();
  }

  private userLoggedIn = new Subject<boolean>();

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }


  private showwise = new Subject<boolean>();

  setshowtemp(template: boolean) {
    this.showwise.next(template);
  }

  getshowtemp(): Observable<boolean> {
    return this.showwise.asObservable();
  }

  private todayNotificationsCountSource = new BehaviorSubject<number>(0);
  todayNotificationsCount$ = this.todayNotificationsCountSource.asObservable();

  setTodayNotificationsCount(count: number): void {
    this.todayNotificationsCountSource.next(count);
  }

  private triggerNotification = new Subject<void>();

  triggerNotification$ = this.triggerNotification.asObservable();

  trigger() {
    this.triggerNotification.next();
    console.log('Notification triggered');
  }
}


