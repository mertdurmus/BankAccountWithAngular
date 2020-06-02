import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/components/Login/Login.component';
import { RegisterComponent } from 'src/components/Register/Register.component';
import { AccountComponent } from 'src/components/Account/Account.component';
import { RouteGuardService } from 'src/services/RouteGuard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: AccountComponent,  canActivate: [RouteGuardService]},
  {path: '**', redirectTo: 'account', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
