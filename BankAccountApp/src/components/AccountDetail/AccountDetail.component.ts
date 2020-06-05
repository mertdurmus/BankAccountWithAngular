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

  // filtersLoaded;
  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService, private currency: CustomCurrencyPipe) { }

  ngOnInit() {
    //  this.getAllAcc();

    this.activatedRoute.params.subscribe(params => {
      this.getAccountById(params['accountId']);
    });
    // this.getAllReceive();
    //  this.getAllSend();
  }
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

  getAllSend() {
    const accntId = this.account.accountId;
    this.accountService.getAllSend(accntId).then(value => {
      this.allSend = value;
      console.log(this.allSend);
    });
  }
  getAllReceive() {
    const accntId = this.account.accountId;
    this.accountService.getAllReceive(accntId).then(value => {
      this.allReceive = value;
      console.log(this.allReceive);
    });
  }

  showTransaction() {
    this.getAllSend();
    this.getAllReceive();
  }
}
