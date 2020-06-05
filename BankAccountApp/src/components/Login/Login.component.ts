import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUser } from 'src/models/loginUser';
import { CurrencyService } from 'src/services/Currency.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginUser: LoginUser;

  constructor( private authService: AuthService,
               private currencyService: CurrencyService) { }

  ngOnInit() {
    this.createForm();
    this.currencyService.refresh();
  }

  logUser() {
    this.loginUser = Object.assign({}, this.loginForm.value);
    console.log(this.loginUser);
    this.authService.login(this.loginUser);
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
}

}
