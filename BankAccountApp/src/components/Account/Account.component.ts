import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/Account.service';
import { AuthService } from 'src/services/Auth.service';
import { Account } from 'src/models/account';
import { Transaction } from 'src/models/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountModalComponent } from '../CreateAccountModal/CreateAccountModal.component';

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
              private accountService: AccountService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getAccounts();
    this.getLastEvent();
    this.authService.setCurrentUserId();
  }


  createAccount() {
    this.router.navigateByUrl('/createAccount');
  }

  // get all account to showing
  getAccounts(){
      this.accountService.getAllAccount().then(value => {
        if (value !== null){
            this.accounts = value;
        }
    });
  }

  // get all last events, transactions
  getLastEvent(){
    this.accountService.getLastEvent().then(value => {
      this.transaction = value;
      if (this.transaction){
        setTimeout(() => {this.assign(); }, 100);
      }
    });
  }

  // select last 10 events
  assign(){
    this.transactionLastTen = this.transaction.slice(0, 10);
  }
  // opening create account with modal form
  open() {
    const modalRef = this.modalService.open(CreateAccountModalComponent);
  }

  deleteAccount(id: string){
    this.accountService.deleteAccount(id);
  }
}
