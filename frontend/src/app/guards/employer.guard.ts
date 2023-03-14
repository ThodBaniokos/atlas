import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmployerGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar, private accountService: AccountService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.accountService.isEmployer()) {

      return true;
    }

    if (!this.accountService.userValue()) {

      this.snackBar.open('Πρέπει να είσαι συνδεδεμένος για να συνεχίσεις', 'ΟΚ');

      this.router.navigate(['index/login']);
    }

    if (this.accountService.userValue()) {

      this.snackBar.open('Δεν έχεις πρόσβαση σε αυτή την σελίδα', 'ΟΚ');
    }

    return false;
  }
}
