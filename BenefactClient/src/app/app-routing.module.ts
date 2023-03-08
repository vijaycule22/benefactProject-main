import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './Login/login.component';
import { LoginRoutes } from './Login/login.routes';


const routes: Routes = [
  ...LoginRoutes,
  {path:'',redirectTo:"Login",pathMatch: 'full'},
  //{path:'Login',component:LoginComponent},
  { path: '**', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Home',loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,HomeModule]
})
export class AppRoutingModule { }
