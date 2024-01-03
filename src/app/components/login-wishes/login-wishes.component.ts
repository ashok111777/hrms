import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import "@lottiefiles/lottie-player";

@Component({
  selector: 'app-login-wishes',
  templateUrl: './login-wishes.component.html',
  styleUrls: ['./login-wishes.component.scss']
})
export class LoginWishesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { timeZone: string }) { }
}
