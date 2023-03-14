import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar, private accountService: AccountService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!this.accountService.userValue()) {

      return true;
    }

    this.snackBar.open('Είσαι ήδη συνδεδεμένος', 'ΟΚ');

    if (this.accountService.userValue()?.userType === 'student') {
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['index/employer']);
    }

    return false;
  }
}