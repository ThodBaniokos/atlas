import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class MasterGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar, private accountService: AccountService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.accountService.isStudent() || this.accountService.isEmployer()) {

      return true;
    }

    this.snackBar.open('Πρέπει να είσαι συνδεδεμένος για να συνεχίσεις', 'ΟΚ');

    this.router.navigate(['index/login']);

    return false;
  }
}
