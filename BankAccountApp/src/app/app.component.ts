import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {
  constructor(private authService: AuthService)
  {}


}
