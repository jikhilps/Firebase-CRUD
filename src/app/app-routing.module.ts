import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/Services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'review-sites',
    loadChildren: () => import('./Pages/review-sites/review-sites.module').then( m => m.ReviewSitesPageModule),
    canActivate:[AuthGuardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
