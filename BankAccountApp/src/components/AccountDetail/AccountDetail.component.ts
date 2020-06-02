import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/services/Account.service';
import { Account } from 'src/models/account';

@Component({
  selector: 'app-AccountDetail',
  templateUrl: './AccountDetail.component.html',
  styleUrls: ['./AccountDetail.component.css'],
  providers: [AccountService]
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  allAccount: Account[];
  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getAccountById(params['accountId']);
      this.getAllAcc();
    })
  }
  getAccountById(accountId) {
  }

  getAllAcc() {
    this.accountService.getAllAccount().then(value => {
      this.allAccount = value;
      console.log(this.allAccount);
    });
  }
}
