import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule) },
  { path: 'supplement', loadChildren: () => import('./pages/food-restaurant/food-restaurant.module').then(f => f.FoodRestaurantModule) },
 
  {path :'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
