import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currency'
})
@Injectable()
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number,  currency: string, symbol: boolean = true): string {
    if (value != null){
      return this.currencyPipe.transform(value, currency, symbol);
    }

    return this.currencyPipe.transform(0, currency, symbol).split('0.00')[0];
  }

}
