import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
      <mat-toolbar color="primary">
        <div class="logo-box">
        <button (click)="menuToggled.emit(true)" mat-icon-button>
          <mat-icon>menu</mat-icon>
        </button>
        <span class="title" routerLink="/">CGS Portal</span>
        </div>
        <button mat-icon-button>
          <mat-icon>zoom_out_map</mat-icon>
        </button> 
        <span class="spacer"></span>
        <!-- <span class="welcome-text">Hello {{ user }}</span> -->
        <button mat-icon-button class="me-3">
          <mat-icon matBadge="3" matBadgeColor="warn">mail_outline</mat-icon>
        </button>
        <button mat-icon-button class="me-3">
          <mat-icon matBadge="5" matBadgeColor="warn">notifications</mat-icon>
        </button>
        <button mat-icon-button [matMenuTriggerFor]="beforeMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #beforeMenu="matMenu">
          <button mat-menu-item>
            <mat-icon color="primary">person</mat-icon>
            <span class="me-3">Profile &nbsp;</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item color="primary">
            <mat-icon color="primary">settings</mat-icon>
            <span class="me-3">Settings &nbsp;</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon color="warn">logout</mat-icon>
            <span class="me-3 text-danger fw-bold">Logout</span>
          </button>
        </mat-menu>
      </mat-toolbar>
    `,
  styles: [
    `
      .logo-box{
        min-width:300px;
      }
        .spacer {
          flex: 1 1 auto;
        }
  
        .title {
          cursor: pointer;
        }
  
        .welcome-text {
          font-size: smaller;
        }
      `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Suryakant!';

  // constructor(private authService: AuthService) { }

  logout(): void {
    console.log('Logged out');
  }
}
