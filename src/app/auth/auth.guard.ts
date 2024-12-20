import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

 
  if (authService.token) {
    return true; 
  }

  
  authService.redirectUrl = router.routerState.snapshot.url;

  router.navigate(['/login']);
  
  return false;
}
