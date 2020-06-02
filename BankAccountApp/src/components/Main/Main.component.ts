import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css'],
  providers: [AuthService]
})
export class MainComponent implements OnInit {  
  constructor(private authService: AuthService,
              private router: Router) { }

  isUserLogged = false;

  logOut() {
    this.authService.logOut();
    this.isUserLoggedIn();
  }
  login() {
    this.router.navigateByUrl('/login');
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    let cs = this.authService.isUserLoggedIn();
    if (cs) {
      this.isUserLogged = true;
    } else {
      this.isUserLogged = false;
    }


  }

  ngOnInit() {
    this.isUserLoggedIn();
  }
}