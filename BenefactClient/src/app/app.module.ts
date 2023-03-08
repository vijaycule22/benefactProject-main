import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GrowlComponent, GrowlModule } from './Components/growl/growl.component';
import { DomHandler } from './Components/domhandler';
import { MessageService } from './Components/MessageService';
import { LoginService } from './Login/login.service';
import { HttpService } from './Shared/HttpService';
import { AtParConstants } from './Shared/AtParConstants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GrowlModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule
  ],
  providers: [FormBuilder,MessageService,DomHandler,LoginService,HttpService,AtParConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
