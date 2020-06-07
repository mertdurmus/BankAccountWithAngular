import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './Alertify.service';
import Dexie from 'dexie';
import { Account } from 'src/models/account';
import { AUTHENTICATED_USER_ID, AUTHENTICATED_USER } from './Auth.service';
import { Transaction } from 'src/models/transaction';
import { CurrencyService } from './Currency.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransferState } from '@angular/platform-browser';

export const accountNumber = 'accountNumber' ;



@Injectable()
export class AccountService {


  constructor(private alertifyService: AlertifyService, private router: Router, private currencyService: CurrencyService) {
    this.createDatabase();
    this.nn = localStorage.getItem(accountNumber);
    this.accntNumber.next(this.nn);
  }

  private db: any;
  x: number;
  accounts: Account[];
  nn;
  accntNumber = new BehaviorSubject<number>(0);


/*
 // async init() {
xx = await this.getAllAccount().then(value => {
    this.accounts = value;
  });

this.accountNumber = await this.accounts.length;
await this.accntNumber.next(this.accountNumber);
 // }
*/

  private createDatabase() {
  this.db = new Dexie('MyBankDatabase');
  this.db.version(1).stores({ accounts: '++accountId, name, amount, currency, userId' });
  // tslint:disable-next-line:max-line-length
  this.db.version(1).stores({ transactions: '++transactionId, actionDate, amount, senderId, description, receiverId, senderName, currency, userId' });
}

 addAccount(account: Account) {
  this.db.accounts
    .add(account)
    .then(async () => {
      this.alertifyService.success('account succesfully created');
      // this.accountNumber += 1;
      const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
      const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
      setTimeout(() => {localStorage.setItem(accountNumber, allItems.length.toString()); }, 100);
     // console.log('allitems: ', allItems.length);
      this.accntNumber.next(allItems.length);
     // console.log('accountttttt: ', this.accountNumber);

    })
    .catch(e => {
      console.log('Error: ' + (e.stack || e));
      this.alertifyService.error('Err! not created please try again');
    });
}


async setTransaction(transaction: Transaction) {

  const sender = transaction.senderId;
  const receiver = transaction.receiverId;
  const value = transaction.amount;
  const senderAccount: Account = await this.db.accounts.get({ accountId: sender });
  let senderAmount = senderAccount.amount;
  const senderCurrency = senderAccount.currency;
  const receiverAccount: Account = await this.db.accounts.get({ accountId: receiver });
  let receiverAmount = receiverAccount.amount;
  const receiverCurrency = receiverAccount.currency;
  const curr = this.currencyService.convert(receiverCurrency, senderCurrency, 1);
  receiverAmount = receiverAmount + (value / curr);
  senderAmount = senderAmount - value;

  this.db.transactions
    .add(transaction)
    .then(() => {
      this.alertifyService.success('transaction succesfully ');
    })
    .catch(e => {
      console.log('Error: ' + (e.stack || e));
      this.alertifyService.error('Err! does not send please try again');
    });

  this.db.accounts.update(sender, { amount: senderAmount }).then(updated => {
    if (updated) {
      console.log('success');
    } else {
      console.log('err!');
    }
  });
  this.db.accounts.update(receiver, { amount: receiverAmount }).then(updated2 => {
    if (updated2) {
      console.log('success');
    } else {
      console.log('err!');
    }
  });

}

async getLastEvent(): Promise<Transaction[]> {
  const userId = localStorage.getItem(AUTHENTICATED_USER);
  // tslint:disable-next-line:max-line-length
  const allItems: Transaction[] = await this.db.transactions.where('userId').equals(userId).reverse().sortBy('actionDate'); // .sortBy('actionDate')
  return allItems;
}

async getAllAccount(): Promise<Account[]> {
  const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
  const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
  return allItems;
}

async getAllSend(accountId: number): Promise<Transaction[]> {
  const allItems: Transaction[] = await this.db.transactions.where('senderId').equals(accountId).toArray();
  return allItems;
}

async getAllReceive(accountId: number): Promise<Transaction[]> {
  const allItems: Transaction[] = await this.db.transactions.where('receiverId').equals(accountId).toArray();
  return allItems;
}

async getAccountById(accntId) {
 // console.log(accntId);
  const x = accntId;
//  const usrId = localStorage.getItem(AUTHENTICATED_USER_ID);
  const account: Account = await this.db.accounts.get({ accountId: x });
  console.log(x, ': ', account);
  return account;
}



async setTransactionFirst(transaction: Transaction) {
  const sender = transaction.senderId;
  const receiver = transaction.receiverId;
  const value = transaction.amount;
  const senderAccount: Account = await this.db.accounts.get({ accountId: sender });
  let senderAmount = senderAccount.amount;
  const receiverAccount: Account = await this.db.accounts.get({ accountId: receiver });
  let receiverAmount = receiverAccount.amount;
  receiverAmount = receiverAmount + value;
  senderAmount = senderAmount - value;

  this.db.transactions
    .add(transaction)
    .then(() => {
      this.alertifyService.success('transaction succesfully ');
    })
    .catch(e => {
      console.log('Error: ' + (e.stack || e));
      this.alertifyService.error('Err! does not send please try again');
    });

  this.db.accounts.update(sender, { amount: senderAmount }).then(updated => {
    if (updated) {
      console.log('success');
    } else {
      console.log('err!');
    }
  });

}
}
