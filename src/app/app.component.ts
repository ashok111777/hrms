import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { SharedService } from './services/shared.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { AlertService } from './services/alerts.service';
import { RestService } from './services/rest.service';
import { GlobalService } from './services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginWishesComponent } from './components/login-wishes/login-wishes.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnChanges {
  private idleTimer: any;
  currentDate: any
  title = 'hms-cgs';
  message: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  constructor(private shared: SharedService, private idle: Idle, private keepalive: Keepalive, private service: SharedService, private router: Router,
    private alertService: AlertService, private cdr: ChangeDetectorRef, private restapi: RestService, private globalService: GlobalService, public dialog: MatDialog,
  ) {

    idle.setIdle(300);
    idle.setTimeout(30);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      // this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // this.router.navigate(['/']);
      this.openIdleAlert();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.service.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });


    this.service.getshowtemp().subscribe(showtemplate => {
      if (showtemplate) {
        setTimeout(() => {
          this.showWishes();
        }, 1000);
      } else {
        console.log('your not login to show getting template');
      }
    })
  }


  showWishes() {
    this.currentDate = new Date();
    const currentHour = this.currentDate.getHours()
    const result = this.globalService.checkCurrentTime(currentHour);
    const wishesModal = this.dialog.open(LoginWishesComponent,
      {
        data: { timeZone: result },
        disableClose: true,
        hasBackdrop: true,
        autoFocus: true
      });
    setTimeout(() => {
      wishesModal.close();
    }, 5000);
  }

  openIdleAlert() {
    this.idleTimer = setTimeout(() => {
      this.alertService.ldlealert('Idle Timeout', 'You will be logged out due to inactivity.').afterClosed().subscribe((result) => {
        if (result === 'stay') {
          // User clicked "Stay," so reset the idle timeout
          this.idle.watch();
        } else {
          this.restapi.getService("auth/web/v1/logout").subscribe((resp: any) => {
            if (resp.respCode == "HMS_00") {
              console.log("logout");
              this.router.navigate(['/prelogin']);
              sessionStorage.clear();
            } else {
              this.alertService.showAlert(resp.message, resp.data.message);
            }
          });
          // User clicked "Logout" or the dialog was closed without action, logout the user
          // Implement your logout action here, e.g., navigate to the logout page
        }
      });
    }, 1000);
  }

  reset() {
    this.idle.watch();
    //this.idleState = 'Started.';
    this.timedOut = false;
  }
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    // this.setupMessageHandlers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
      console.log('Data has been received: ' + JSON.stringify(this.message));
    }
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey: environment.firebase.vapidKey
    }).then((currentToken) => {
      if (currentToken) {
        // console.log("Token is: " + currentToken);
        this.shared.setfcmtoken(currentToken)
      } else { }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    // Handle both foreground and background messages
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Check if payload.data exists before accessing its properties
      const data = payload.data;
      if (data) {
        console.log(data);
       this.shared.trigger();
        this.shared.setSData(payload);
      } else {
        console.log('Payload does not contain data.');
      }
    });
  }

}




