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

export const accountNumber = 'accountNumber';



@Injectable()
export class AccountService {



  constructor(private alertifyService: AlertifyService,
              private router: Router,
              private currencyService: CurrencyService) {

    // initialize behavior subject for account number
    this.createDatabase();
    this.nn = localStorage.getItem(accountNumber);
    this.accntNumber.next(this.nn);
  }


  private db: any;
  x: number;
  accounts: Account[];
  nn;
  accntNumber = new BehaviorSubject<number>(0);



  private createDatabase() {
    this.db = new Dexie('MyBankDatabase');
    this.db.version(1).stores({ accounts: '++accountId, name, amount, currency, userId' });
    // tslint:disable-next-line:max-line-length
    this.db.version(1).stores({
      transactions: '++transactionId, actionDate, amount, senderId, description, receiverId, senderName, currency, userId, senderLastValue, receiverLastValue'
    });
  }



 async addAccount(account: Account) {
    this.db.accounts
      .add(account)
      .then(async () => {
        this.alertifyService.success('account succesfully created');
        this.updateAccountNumber();
      })
      .catch(e => {
        console.log('Error: ' + (e.stack || e));
        this.alertifyService.error('Err! account not created please try again');
      });
      // account amount convert nmuber type
    const thisAccount: Account = await this.db.accounts.get({ accountId: account.accountId });
    const amountNumberType = thisAccount.amount - 0 ;
    this.db.accounts.update(thisAccount, { amount: amountNumberType }).then(updated => {
      if (updated) {
        console.log('success');
      } else {
        console.log('err!');
      }
    });

  }

   async updateAccountNumber(){
    const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
    const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
    this.accntNumber.next(allItems.length);
    setTimeout(() => { localStorage.setItem(accountNumber, allItems.length.toString()); }, 25);
  }

  async setTransaction(transaction: Transaction) {

    const sender = transaction.senderId;
    const receiver = transaction.receiverId;
    const transId = transaction.transactionId;
    const value = transaction.amount;
    const senderAccount: Account = await this.db.accounts.get({ accountId: sender });
    let senderAmount = senderAccount.amount;
    const senderCurrency = senderAccount.currency;
    const receiverAccount: Account = await this.db.accounts.get({ accountId: receiver });
    let receiverAmount = receiverAccount.amount;
    const receiverCurrency = receiverAccount.currency;
    const curr = this.currencyService.convert(receiverCurrency, senderCurrency, 1);
    receiverAmount = receiverAmount + (value / curr);
    senderAmount = senderAmount - (value);

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
    this.getUpdatedAccountAmount(sender, receiver, transId);
  }


  async getUpdatedAccountAmount(senderId: number, receiverId: number, transctionId: string) {
    const senderAccount: Account = await this.db.accounts.get({ accountId: senderId });
    const senderAmount = senderAccount.amount;
    const receiverAccount: Account = await this.db.accounts.get({ accountId: receiverId });
    const receiverAmount = receiverAccount.amount;
    // const transaction: Transaction = await this.db.transactions.get({transactionId: transctionId});
    this.db.transactions.update(transctionId, { senderLastValue: senderAmount, receiverLastValue: receiverAmount }).then(updated => {
      if (updated) {
        console.log(' transaction successfully updated');
      } else {
        console.log('err!');
      }
    });

  }

  async getLastEvent(): Promise<Transaction[]> {
    const userId = localStorage.getItem(AUTHENTICATED_USER);
    // tslint:disable-next-line:max-line-length
    const allItems: Transaction[] = await this.db.transactions.where('userId').equals(userId).reverse().sortBy('actionDate').catch(
      err => {
      console.error(err.stack || err);
      });

    if (allItems[0]) {
      return allItems;
    } else {
      console.log('No Transaction');
    }
  }


  async getAllAccount(): Promise<Account[]> {
    this.updateAccountNumber();
    const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
    const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
    if (allItems[0]) {
      return allItems;
    } else {
      return null;
      this.alertifyService.warning('you are new client welcome! please open a account');
    }

  }

  async getAllSend(accountId: number): Promise<Transaction[]> {
    const allItems: Transaction[] = await this.db.transactions.where('senderId').equals(accountId).toArray();
    if (allItems[0]) {
      return allItems;
    } else {
      console.log('No Transaction');
    }
  }

  async getAllReceive(accountId: number): Promise<Transaction[]> {
    const allItems: Transaction[] = await this.db.transactions.where('receiverId').equals(accountId).toArray();
    if (allItems[0]) {
      return allItems;
    } else {
      console.log('No Transaction');
    }
  }

  async getAccountById(accntId) {
    const x = accntId;
    const account: Account = await this.db.accounts.get({ accountId: x });
    console.log(x, ': ', account);
    return account;
  }



  async setTransactionFirst(transaction: Transaction) {
    const sender = transaction.senderId;
    const receiver = transaction.receiverId;
    const value = transaction.amount;
    const transId = transaction.transactionId;
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
    this.getUpdatedAccountAmount(sender, receiver, transId);
  }
}

