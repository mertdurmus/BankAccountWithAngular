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
import { CreateAccountComponent } from 'src/components/CreateAccount/CreateAccount.component';
import { GetTransactionComponent } from 'src/components/getTransaction/getTransaction.component';
import { CurrencyService } from 'src/services/Currency.service';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ColorDirective } from './directives/color.directive';
import { CustomCurrencyPipe } from './pipes/currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { TransfersComponent } from 'src/components/Transfers/Transfers.component';
import { FilterPipe } from './pipes/filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/services/Account.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateAccountModalComponent } from 'src/components/CreateAccountModal/CreateAccountModal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AccountDetailComponent,
    MainComponent,
    CreateAccountComponent,
    GetTransactionComponent,
    CreateAccountModalComponent,
    ColorDirective,
    CustomCurrencyPipe,
    TransfersComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  entryComponents:[
    CreateAccountModalComponent
  ],
  // global service declarations
  providers: [AlertifyService, RouteGuardService, CurrencyService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
