import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CurrencyService {

constructor(private http: HttpClient) { }

// set endpoint and your API key
endpoint = 'convert';
access_key = 'f6b7c464aba53cb70256cc58781ca137';
baseURL = 'http://data.fixer.io/api/';

currencySymbols() {
  return this.http.get(
    this.baseURL + 'symbols?access_key=' + this.access_key
  );
}
currencyRate() {
  return this.http.get(this.baseURL + 'latest?access_key=' + this.access_key);
}


}
