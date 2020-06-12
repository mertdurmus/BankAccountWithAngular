import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { User } from 'src/models/user';
import { LoginUser } from 'src/models/loginUser';
import { AlertifyService } from './Alertify.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export const AUTHENTICATED_USER = 'authenticatedUser';
export const AUTHENTICATED_USER_ID = 'authenticatedUserId';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private db: any;
  user1: User;

  constructor(private alertifyService: AlertifyService,
              private router: Router, ) {
                // database initialize
                this.createDatabase();
  }

  // create account database
  private createDatabase() {
    this.db = new Dexie('MyAppDatabase');
    this.db.version(1).stores({ users: '++id, firstName, lastName, userName, password, confirmPassword' });
  }

  // Kullanıcıyı kayıt eden fonksiyon
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

  // login fonksiyonu, username ve passwordden oluşan LoginUser nesnesini parametre olarak alır.
  async login(loginUser: LoginUser) {
    const user = await this.db.users.where('userName').equals(loginUser.userName).toArray();
    console.log(user[0]);
    if (user[0]) {
      if (user[0].password === loginUser.password) {
        localStorage.setItem(AUTHENTICATED_USER, loginUser.userName);
        this.alertifyService.success('Succecfully Login');
        this.router.navigateByUrl('/account');
        setTimeout(() => { window.location.reload(); }, 100);
      } else {
        this.alertifyService.warning('password incorrect');
      }
    } else {
      this.alertifyService.error('username incorrect');
    }
  }

  // kullanıcının oturumunu kontrol eden fonksiyon
  isUserLoggedIn(): boolean {
    const user = localStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  // oturumundan çıkış yaptığımız fonksiyon, localStoragedaki oturum bilgilerini temizliyoruz.
  logOut() {
    localStorage.removeItem(AUTHENTICATED_USER);
    localStorage.removeItem(AUTHENTICATED_USER_ID);
    this.alertifyService.error('user succesfully log out');
  }

  // localStorage'a kullanıcının kullanıcı id'sini kayıt eden fonksiyon
  async setCurrentUserId() {
    const user = localStorage.getItem(AUTHENTICATED_USER);
    const userDb = await this.db.users.where('userName').equals(user).toArray();
    localStorage.setItem(AUTHENTICATED_USER_ID, userDb[0].id);
  }

  // main page için kullanıcı adını döndüren fonksiyon
  async getUserNames(): Promise<string>{
    const user = localStorage.getItem(AUTHENTICATED_USER);
    const userDb = await this.db.users.where('userName').equals(user).toArray();
    const firstName = userDb[0].firstName;
    const lastName = userDb[0].lastName;
    return firstName + ' ' + lastName;
  }


}
