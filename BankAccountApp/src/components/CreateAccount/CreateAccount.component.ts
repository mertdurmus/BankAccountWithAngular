import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/models/account';
import { AuthService, AUTHENTICATED_USER_ID } from 'src/services/Auth.service';
import { AccountService } from 'src/services/Account.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-CreateAccount',
  templateUrl: './CreateAccount.component.html',
  styleUrls: ['./CreateAccount.component.css'],
  providers: [AuthService, AccountService]
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  account: Account;
  id: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
    this.authService.setCurrentUserId();
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['10000', Validators.required],
      currency: ['', Validators.required],
    });
  }
  onSubmit() {
    this.account = Object.assign({}, this.accountForm.value);
    this.id = localStorage.getItem(AUTHENTICATED_USER_ID);
    this.account.userId = this.id;
    this.account.accountId = uuidv4();
    this.accountService.addAccount(this.account);


  }
}
