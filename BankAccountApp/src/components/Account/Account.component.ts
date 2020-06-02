import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/Account.service';
import { AuthService } from 'src/services/Auth.service';
import { Account } from 'src/models/account';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.css'],
  providers:[AccountService, AuthService]
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  constructor(private router: Router,
              private authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit() {
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
}
