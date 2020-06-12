import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import Dexie from 'dexie';

@Injectable()
export class CurrencyService {

    rate = {};
    rates = [];
    rateKeys = [];
    symbol = {};
    symbols = [];
    symbolKeys = [];
    USDTRY: number;
    EURTRY: number;
    XAUTRY: number;

  constructor(private http: HttpClient) {
  }

  endpoint = 'convert';
  accessKey = 'dde7f7a9252e9844ef11e15395df687c';
  baseURL = 'http://data.fixer.io/api/';
  private db: any;


  currencySymbols() {
    return this.http.get(
      this.baseURL + 'symbols?access_key=' + this.accessKey
    ).subscribe(
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
      err => { }
    );
  }



  currencyRate() {
    return this.http.get(this.baseURL + 'latest?access_key=' + this.accessKey).subscribe(
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
      },
      err => { }
    );
  }

  convert(fromX: string, toX: string, value: number): number {
    const from = fromX;
    const to = toX;
    const amount = value;
    const toIndex = _.findIndex(this.rates, rate => {
      return rate.code === to;
    });
    const fromIndex = _.findIndex(this.rates, rate => {
      return rate.code === from;
    });
    const ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    const cal = ratio * amount;

    return cal;
  }

  // reverse convert
  need(fromX: string, toX: string, value: number): number {
    const from = fromX;
    const to = toX;
    const amount = value;
    const toIndex = _.findIndex(this.rates, rate => {
      return rate.code === to;
    });
    const fromIndex = _.findIndex(this.rates, rate => {
      return rate.code === from;
    });
    const ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    const cal = amount / ratio;
    return cal;
  }

  // initialize currency which we needed
  test(){
    this.USDTRY = this.convert('USD', 'TRY', 1);
    this.EURTRY = this.convert('EUR', 'TRY', 1);
    this.XAUTRY = this.convert('XAU', 'TRY', 1);
  }

  getUsdTry(): number{
    this.test();
    return this.USDTRY;
  }

  getEurTry(): number{
    return this.EURTRY;
  }

  getXauTry(): number{
    return (this.XAUTRY / 33.1);
  }

  refresh(){
    this.currencyRate();
    this.currencySymbols();
  }
}
