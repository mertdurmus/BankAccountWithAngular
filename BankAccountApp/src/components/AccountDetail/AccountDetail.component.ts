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
  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
  //  this.getAllAcc();
  
      this.activatedRoute.params.subscribe(params => {
        this.getAccountById(params['accountId']);
      })

  }
  getAccountById(accountId) {
    /*
    for (var val = 0; val < this.allAccount.length; val++) {
      if (this.allAccount[val].accountId == accountId) {
        this.account = this.allAccount[val];
        console.log(this.account);
      }
    }
    */

    this.accountService.getAccountById(accountId).then(value => {
      this.account = value;
    });
  }

  getAllAcc() {
    this.accountService.getAllAccount().then(value => {
      this.allAccount = value;
      console.log(this.allAccount);
    });
  }

}
