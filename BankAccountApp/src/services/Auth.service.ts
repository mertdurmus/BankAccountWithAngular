import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { User } from 'src/models/user';
import { LoginUser } from 'src/models/loginUser';
import { AlertifyService } from './Alertify.service';
import { Router } from '@angular/router';


export const AUTHENTICATED_USER = 'authenticatedUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private db: any;
  user1: User;

  constructor(private alertifyService: AlertifyService,
    private router: Router, ) {
    this.createDatabase();
  }


  private createDatabase() {
    this.db = new Dexie('MyAppDatabase');
    this.db.version(1).stores({ users: '++id, firstName, lastName, userName, password' });
  }

  addToIndexedDb(user: User) {
    this.db.users
      .add(user)
      .then(async () => {
        const allItems: User[] = await this.db.users.toArray();
        console.log('saved in DB, DB is now', allItems);
        this.alertifyService.success('registiration succesful');
      })
      .catch(e => {
        console.log('Error: ' + (e.stack || e));
        this.alertifyService.error('not registered please try again');
      });
  }


  async login(loginUser: LoginUser) {
    const user = await this.db.users.where('userName').equals(loginUser.userName).toArray();
    if (user[0].password === loginUser.password) {
      localStorage.setItem(AUTHENTICATED_USER, loginUser.userName);
      this.alertifyService.success('Succecfully Login');
      this.router.navigateByUrl('/account');
    } else {
      this.alertifyService.warning('login not succesfully');
    }

  }

  isUserLoggedIn() {

    const user = localStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem(AUTHENTICATED_USER);
    this.alertifyService.error('Sistemden çıkış yapıldı');
  }



  private async sendItemsFromIndexedDb() {
    const allItems: User[] = await this.db.todos.toArray();
    allItems.forEach((item: User) => {
      // send items to backend...
      this.db.users.delete(item.id).then(() => {
        console.log(`item ${item.id} sent and deleted locally`);
      });
    });
  }

}
