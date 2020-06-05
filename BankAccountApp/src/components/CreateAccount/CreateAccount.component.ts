import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/models/account';
import { AuthService, AUTHENTICATED_USER_ID } from 'src/services/Auth.service';
import { AccountService } from 'src/services/Account.service';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyService } from 'src/services/Currency.service';
import { Transaction } from 'src/models/transaction';

@Component({
  selector: 'app-CreateAccount',
  templateUrl: './CreateAccount.component.html',
  styleUrls: ['./CreateAccount.component.css'],
  providers: [AuthService, AccountService]
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  account: Account;
  id: any;
  firstAccountCheck: boolean;
  accounts: Account[];
  senderAccountId: number;
  senderAmount: number;
  senderAccount: Account;
  transaction: Transaction = {actionDate: new Date(), transactionId: '0', senderId: 10,
   receiverId: 10, description: 'init', amount: 0, senderName: 'init', currency: 'init'};

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private accountService: AccountService,
              private currencyService: CurrencyService) { }

  ngOnInit() {
    this.accountService.getAllAccount().then(value => {
      if (value.length === 0) {
        this.firstAccountCheck = true;

      } else {
        this.firstAccountCheck = false;
      }
    });
    this.createForm();
    this.authService.setCurrentUserId();
    this.getAccounts();
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['10000', Validators.required],
      currency: ['', Validators.required],
    });
  }
  onSubmit() {
    this.account = Object.assign({}, this.accountForm.value);
    this.id = localStorage.getItem(AUTHENTICATED_USER_ID);
    this.account.userId = this.id;
    this.account.accountId = uuidv4();
    this.accountService.addAccount(this.account);
 //   console.log(this.senderAccountId);
    this.transformation();
  }

  onSubmitFirst() {
    this.account = Object.assign({}, this.accountForm.value);
    this.id = localStorage.getItem(AUTHENTICATED_USER_ID);
    this.account.userId = this.id;
    this.account.accountId = uuidv4();
    this.accountService.addAccount(this.account);
  }

  getAccounts() {
    this.accountService.getAllAccount().then(value => {
      this.accounts = value;
   //   console.log(this.accounts);
    });
  }
  transformation(){
   const senderAccount = this.accounts.filter(x => x.accountId === this.senderAccountId)[0];
   this.senderAccount = senderAccount;
   console.log(this.senderAccount.currency);
   const senderCurrency = senderAccount.currency;
   const receiverCurrency = this.account.currency;
   const receiverAmount = this.account.amount;
   this.senderAmount = this.senderAmount = this.currencyService.need(senderCurrency, receiverCurrency, receiverAmount);
   console.log(this.senderAmount);
   this.saveTransaction();

  }

  saveTransaction(){
    this.transaction.transactionId = uuidv4();
    this.transaction.actionDate = new Date();
    this.transaction.amount = this.senderAmount;
    this.transaction.description = 'creating new account';
    this.transaction.receiverId = this.account.accountId;
    this.transaction.senderId = this.senderAccountId;
    this.transaction.senderName = this.senderAccount.name;
    this.transaction.currency = this.senderAccount.currency;
    this.accountService.setTransactionFirst(this.transaction);


  }



}
