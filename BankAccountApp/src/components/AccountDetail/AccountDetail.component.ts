import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/services/Account.service';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/transaction';
import { CustomCurrencyPipe } from 'src/app/pipes/currency.pipe';

@Component({
  selector: 'app-AccountDetail',
  templateUrl: './AccountDetail.component.html',
  styleUrls: ['./AccountDetail.component.css'],
  providers: [AccountService, CustomCurrencyPipe]
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  allAccount: Account[];
  allSend: Transaction[];
  allReceive: Transaction[];
  greenColor = 'green';
  redColor = 'red';


  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService, private currency: CustomCurrencyPipe) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getAccountById(params['accountId']);
    });
  }
  // detayı gösterilecek hesabı getiren fonksiyon, parametre olarak router'a eklediğimiz accountId parametresini alır
  getAccountById(accountId) {
    this.accountService.getAccountById(accountId).then(value => {
      this.account = value;
    });
  }

  getAllAcc() {
    this.accountService.getAllAccount().then(value => {
      this.allAccount = value;
    });
  }
  // hesabın para gönderme işlemlerini çekiyoruz
  getAllSend() {
    const accntId = this.account.accountId;
    this.accountService.getAllSend(accntId).then(value => {
      this.allSend = value;
      console.log(this.allSend);
    });
  }
  // hesabın para alma işlemlerini çekiyoruz
  getAllReceive() {
    const accntId = this.account.accountId;
    this.accountService.getAllReceive(accntId).then(value => {
      this.allReceive = value;
      console.log(this.allReceive);
    });
  }
  // işlem detaylarını gösteren fonksiyon
  showTransaction() {
    this.getAllSend();
    this.getAllReceive();
  }

}
