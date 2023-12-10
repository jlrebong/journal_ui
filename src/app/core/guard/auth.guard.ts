import { CanActivateFn, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let tree = createUrlTreeFromSnapshot(route, ['/login']);
  return inject(UserService).isLoggedIn() || tree;
};

