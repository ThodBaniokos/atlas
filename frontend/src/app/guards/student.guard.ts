import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar, private accountService: AccountService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.accountService.isStudent()) {

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
