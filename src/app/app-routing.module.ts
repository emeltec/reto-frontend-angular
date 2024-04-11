import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard } from './guards/user-logged.guard';
import { LandingComponent } from './views/public/landing/landing.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./views/private/users/users.module').then(m => m.UsersModule),
    canActivate: [UserLoggedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./views/public/login/login.module').then(m => m.LoginModule)
  },

  { path: 'home', component: LandingComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
