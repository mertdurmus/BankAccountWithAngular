import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/components/Login/Login.component';
import { RegisterComponent } from 'src/components/Register/Register.component';
import { AccountComponent } from 'src/components/Account/Account.component';
import { RouteGuardService } from 'src/services/RouteGuard.service';
import { CreateAccountComponent } from 'src/components/CreateAccount/CreateAccount.component';
import { AccountDetailComponent } from 'src/components/AccountDetail/AccountDetail.component';
import { GetTransactionComponent } from 'src/components/getTransaction/getTransaction.component';
import { TransfersComponent } from 'src/components/Transfers/Transfers.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'createAccount', component: CreateAccountComponent,  canActivate: [RouteGuardService]},
  { path: 'transfers', component: TransfersComponent,  canActivate: [RouteGuardService]},
  { path: 'getTransaction/:accountId', component: GetTransactionComponent,  canActivate: [RouteGuardService]},
  { path: 'getTransaction', component: GetTransactionComponent,  canActivate: [RouteGuardService]},
  { path: 'getTransaction/:virman/:userId', component: GetTransactionComponent,  canActivate: [RouteGuardService]},
  { path: 'accountDetail/:accountId', component: AccountDetailComponent,  canActivate: [RouteGuardService]},
  { path: 'account', component: AccountComponent,  canActivate: [RouteGuardService]},
  {path: '**', redirectTo: 'account', pathMatch: 'full'},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
