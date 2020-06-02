import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertifyService } from 'src/services/Alertify.service';
import { LoginComponent } from 'src/components/Login/Login.component';
import { RegisterComponent } from 'src/components/Register/Register.component';
import { AccountComponent } from 'src/components/Account/Account.component';
import { AccountDetailComponent } from 'src/components/AccountDetail/AccountDetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteGuardService } from 'src/services/RouteGuard.service';
import { MainComponent } from 'src/components/Main/Main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AccountDetailComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [AlertifyService, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
