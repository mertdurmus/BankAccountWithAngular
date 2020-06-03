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

  rate = {};
  rates = [];
  rateKeys = [];
  symbol = {};
  symbols = [];
  symbolKeys = [];


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
    this.init();
    
  }

test(){
  this.convert();
}

  init() {
    this.currencyService.currencyRate().subscribe(
      data => {
        this.rate = data['rates'];
        this.rateKeys = Object.keys(this.rate);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.rateKeys.length; i++) {
          this.rates.push({
            code: this.rateKeys[i],
            text: this.rate[this.rateKeys[i]]
          });
        }
        console.log(data);
      },
      err => {}
    );

    this.currencyService.currencySymbols().subscribe(
      data => {
        this.symbol = data['symbols'];
        this.symbolKeys = Object.keys(this.symbol);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.symbolKeys.length; i++) {
          this.symbols.push({
            code: this.symbolKeys[i],
            text: this.symbol[this.symbolKeys[i]]
          });
        }
        console.log(data);
      },
      err => {}
    );
  }


  convert() {
    let from = 'USD';
    let to = 'TRY';
    let amount = 1;
    let toIndex = _.findIndex(this.rates, rate => {
      return rate.code == to;
    });
    let fromIndex = _.findIndex(this.rates, rate => {
      return rate.code == from;
    });
    let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    console.log('ratio: ', ratio.toString());

    let cal = ratio * amount;

    console.log('cal: ', cal.toString());
  }
}