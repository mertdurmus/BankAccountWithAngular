import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './Alertify.service';
import Dexie from 'dexie';
import { Account } from 'src/models/account';
import { AUTHENTICATED_USER_ID } from './Auth.service';
import { Transaction } from 'src/models/transaction';

@Injectable()
export class AccountService {

  private db: any;
  x: number;


  constructor(private alertifyService: AlertifyService, private router: Router, ) {
    this.createDatabase();
  }



  private createDatabase() {
    this.db = new Dexie('MyBankDatabase');
    this.db.version(1).stores({ accounts: '++accountId, name, amount, currency, userId' });
    this.db.version(1).stores({ transactions: '++transactionId, actionDate, amount, senderId, description' });
  }

  addAccount(account: Account) {
    this.db.accounts
      .add(account)
      .then(() => {
        //  const allItems: Account[] = await this.db.accounts.toArray();
        //  console.log('saved in DB, DB is now', allItems);
        this.alertifyService.success('account succesfully created');
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
    this.db.accounts.update(receiver, { amount: receiverAmount }).then(updated2 => {
      if (updated2) {
        console.log('success');
      } else {
        console.log('err!');
      }
    });

  }


  async getAllAccount() {
    const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
    const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
    return allItems;
  }
  /*
  async getAccountById(id): Promise<Account>{
    console.log(id);
    const account: Account =  await this.db.accounts.where('accountId').equals(id).toArray();
    console.log(account);
    this.getAccountById2(id);
    return account;
  }
  */
  async getAccountById(accntId) {
    console.log(accntId);
    const x = accntId;
    const usrId = localStorage.getItem(AUTHENTICATED_USER_ID);
    //  const allItems: Account[] = await this.db.accounts.where('userId').equals(usrId).toArray();
    const account: Account = await this.db.accounts.get({ accountId: x });
    console.log(x, ': ', account);
    return account;
  }

}
