import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private data: DataService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const appId = this.data.usuarios().getItem();
    if (appId) {
      return true;
    } else {
      this.router.navigate(['/app/login']);
      return false;
    }
  }
}
