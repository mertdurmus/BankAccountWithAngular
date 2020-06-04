import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/services/Currency.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css'],
  providers: [AuthService]
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private currencyService: CurrencyService) { }

  isUserLogged = false;


  USDTRY: number;
  EURTRY: number;
  XAUTRY: number;



  logOut() {
    this.authService.logOut();
    this.isUserLoggedIn();
  }
login() {
  this.router.navigateByUrl('/login');
  this.isUserLoggedIn();
}

isUserLoggedIn() {
  let cs = this.authService.isUserLoggedIn();
  if (cs) {
    this.isUserLogged = true;
  } else {
    this.isUserLogged = false;
  }


}

ngOnInit() {
  this.isUserLoggedIn();
  
}

refresh(){

  this.USDTRY = this.currencyService.getUsdTry();
  this.EURTRY = this.currencyService.getEurTry();
  this.XAUTRY = this.currencyService.getXauTry();
}


}