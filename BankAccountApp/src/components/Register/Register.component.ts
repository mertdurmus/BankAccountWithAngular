import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/Auth.service';
import { User } from 'src/models/user';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService) { }

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
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
