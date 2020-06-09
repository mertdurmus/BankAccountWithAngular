import { Component, OnInit, ɵConsole, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/services/Currency.service';
import * as _ from 'lodash';
import { AccountService } from 'src/services/Account.service';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css'],
  providers: [AuthService, AccountService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainComponent implements OnInit {
  
    constructor(private authService: AuthService,
                private router: Router,
                private currencyService: CurrencyService,
                private accountService: AccountService,
                public translate: TranslateService,
                private ref: ChangeDetectorRef) {
                setInterval(() => {
                     this.accountService.accntNumber.subscribe(
                        {
                            next: (v) => this.numbersOfAccount = v
                        });
                     this.ref.markForCheck(); }, 1000);

                translate.addLangs(['en', 'tr']);
                translate.setDefaultLang('en');
    }

  isUserLogged = false;

  @Input()
  numbersOfAccount: number;

  USDTRY: number;
  EURTRY: number;
  XAUTRY: number;
  title = ' Bank Account App';
  username;

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  logOut() {
    this.authService.logOut();
    this.isUserLoggedIn();
    this.router.navigateByUrl('/login');
  }
  login() {
    this.router.navigateByUrl('/login');
    this.isUserLoggedIn();
  }
  getUserName(){
    this.authService.getUserNames().then(value => {
      if (value !== null){
          this.username = value;
      }
  });
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
    this.accountService.accntNumber.subscribe(
      {
        next: (v) => this.numbersOfAccount = v
      }
    );
    console.log(this.numbersOfAccount);
    this.currencyService.refresh();
    this.getUserName();
  }

  refresh() {

    this.USDTRY = this.currencyService.getUsdTry();
    this.EURTRY = this.currencyService.getEurTry();
    this.XAUTRY = this.currencyService.getXauTry();
  }

  refreh() {
    this.accountService.accntNumber.subscribe(
      {
        next: (v) => this.numbersOfAccount = v
      }
    );
  }

}