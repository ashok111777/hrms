import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    authToken: string | null = null;
    constructor(
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    canActivate() {
        if (this.authToken) {
            // logged in so return true
            return true;
        }
        console.log("Logged Out, routing to login from auth guard")
        this.showToast('Please login first to use this service');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/prelogin/login']);
        return true;
    }
    canActivateChild() {
        return this.canActivate();
    }
    showToast(msg: string) {
        this.snackBar.open(msg, 'Dismiss', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
        });
    }
}