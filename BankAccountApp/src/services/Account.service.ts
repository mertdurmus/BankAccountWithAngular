import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './Alertify.service';
import Dexie from 'dexie';
import { Account } from 'src/models/account';
import { AUTHENTICATED_USER_ID } from './Auth.service';

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

async getAllAccount(){
  const userId = localStorage.getItem(AUTHENTICATED_USER_ID);
  const allItems: Account[] = await this.db.accounts.where('userId').equals(userId).toArray();
  return allItems;
}

async getAccountById(id: string): Promise<Account>{
  console.log(id);
  const account: Account =  await this.db.accounts.where('accountId').equals(id).toArray();
  console.log(account[0]);
  this.getAccountById2(id);
  return account;
}
 getAccountById2(accountId){
  console.log(accountId);
  const x = accountId;
  const account: Account =  this.db.accounts.get(accountId);
  console.log(x, ': ', account);
  return account;
}

}
