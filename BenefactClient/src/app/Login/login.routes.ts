import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

export const LoginRoutes: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: 'Login/:redirected', component: LoginComponent },
];