import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/Account.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaction } from 'src/models/transaction';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyService } from 'src/services/Currency.service';

@Component({
  selector: 'app-getTransaction',
  templateUrl: './getTransaction.component.html',
  styleUrls: ['./getTransaction.component.css'],
  providers: [AccountService]
})
export class GetTransactionComponent implements OnInit {
  senderAccountId: number;
  transactionForm: FormGroup;
  transaction: Transaction;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private currencyService: CurrencyService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getAccountIdById(params['accountId']);
    })
    this.createForm();
    this.currencyService.refresh();
  }

  getAccountIdById(accountId){
    this.senderAccountId = accountId;
    console.log(this.senderAccountId);

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
    this.transaction.transactionId = uuidv4();
    this.transaction.actionDate = new Date();
    this.accountService.setTransaction(this.transaction);
  }

}
