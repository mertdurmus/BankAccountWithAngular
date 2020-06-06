import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/Account.service';
import { AuthService } from 'src/services/Auth.service';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/transaction';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.css'],
  providers:[AccountService, AuthService]
})
export class AccountComponent implements OnInit {

  accounts: Account[];
  transaction: Transaction[];
  transactionLastTen: Transaction[];

  constructor(private router: Router,
              private authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.getLastEvent();
    this.authService.setCurrentUserId();
    this.getAccounts();
  }

  createAccount() {
    this.router.navigateByUrl('/createAccount');
  }

  getAccounts(){
      this.accountService.getAllAccount().then(value => {
      this.accounts = value;
      console.log(this.accounts);
    });
  }

  getLastEvent(){
    this.accountService.getLastEvent().then(value => {
      this.transaction = value;
      setTimeout(() => {this.assign(); }, 300);
    });
  }

  assign(){
    this.transactionLastTen = this.transaction.slice(0, 10);
    console.log(this.transactionLastTen);
  }
}
