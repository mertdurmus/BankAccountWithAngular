import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/Account.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaction } from 'src/models/transaction';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyService } from 'src/services/Currency.service';
import { Account } from 'src/models/account';
import { AUTHENTICATED_USER } from 'src/services/Auth.service';

@Component({
  selector: 'app-getTransaction',
  templateUrl: './getTransaction.component.html',
  styleUrls: ['./getTransaction.component.css'],
  providers: [AccountService]
})
export class GetTransactionComponent implements OnInit {
  senderAccountId: number;
  receiverId: number;
  transactionForm: FormGroup;
  transaction: Transaction;
  account: Account;
  myAccounts: Account[];
  virman = false;
  choose = false;
  userId;
  showList = false;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private currencyService: CurrencyService) { }

  ngOnInit() {
    this.userId = localStorage.getItem(AUTHENTICATED_USER);
    this.activatedRoute.params.subscribe(params => {
      console.log('params: ', params);
      if (params['accountId']){
        this.getAccountIdById(params['accountId']);
      }
      if (params['virman']){
        this.setVirman(params['virman']);
      }
    });

    this.createForm();
    this.currencyService.refresh();
    this.getAccounts();
  }

  setVirman(virman){
    this.choose = true;
    this.virman = true;
  }

  getAccountIdById(accountId){
    this.choose = true;
    this.virman = false;
    this.senderAccountId = accountId;
    console.log(this.senderAccountId);
    this.accountService.getAccountById(accountId).then(value => {
      this.account = value;
      console.log(this.account);
    });

  }
  createForm() {
    this.transactionForm = this.formBuilder.group({
      receiverId: ['', Validators.required],
      amount: [10000,  Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit(){
    this.transaction = Object.assign({}, this.transactionForm.value);
    this.transaction.senderId = this.senderAccountId;
    this.transaction.userId = this.userId;
    this.transaction.transactionId = uuidv4();
    this.transaction.actionDate = new Date();
    this.transaction.senderName = this.account.name;
    this.transaction.currency = this.account.currency;
    this.accountService.setTransaction(this.transaction);
  }

  onSubmitVirman(){
    this.transaction = Object.assign({}, this.transactionForm.value);
    this.accountService.getAccountById(this.senderAccountId).then(value => {
      this.account = value;
    });
    setTimeout(() => {this.init(); }, 1000);

  }
  init(){
    this.transaction.senderId = this.senderAccountId;
    this.transaction.receiverId = this.receiverId;
    this.transaction.transactionId = uuidv4();
    this.transaction.userId = this.userId;
    this.transaction.actionDate = new Date();
    this.transaction.senderName = this.account.name;
    this.transaction.currency = this.account.currency;
    this.accountService.setTransaction(this.transaction);
  }

  getAccounts() {
    this.accountService.getAllAccount().then(value => {
      this.myAccounts = value;
   //   console.log(this.accounts);
    });
  }

  list(){
    this.showList = true;
  }




}
