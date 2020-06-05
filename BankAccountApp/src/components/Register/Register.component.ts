import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/services/Auth.service';
import { User } from 'src/models/user';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmedValidator } from './ConfirmedValidator';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  saveUser() {
    this.user = Object.assign({}, this.registerForm.value);
    console.log(this.user.firstName);
    this.user.id = uuidv4();
    this.authService.addToIndexedDb(this.user);
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }
}
