import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/Account.service';
import { Transaction } from 'src/models/transaction';



@Component({
  selector: 'app-Transfers',
  templateUrl: './Transfers.component.html',
  styleUrls: ['./Transfers.component.css'],
  providers: [AccountService]
})
export class TransfersComponent implements OnInit {

  constructor(private accountService: AccountService) { }
// , private filterTablePipe: FilterTablePipe
  transaction: Transaction[];
  filterText = '';
  amountText = 0;
  currencyText = '';
  dateText = '';

  ngOnInit() {
    this.getLastEvent();
  }

  getLastEvent(){
    this.accountService.getLastEvent().then(value => {
      this.transaction = value;
    });
  }
}

/*
 <div class="container">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              [(ngModel)]="filterText"
              [ngModelOptions]="{ standalone: true }"
              class="form-control"
              id="filterText"
            />
            <p><small> Search in description</small></p>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              [(ngModel)]="amountText"
              [ngModelOptions]="{ standalone: true }"
              class="form-control"
              id="amountText"
            />
            <p><small> Search in amount</small></p>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              [(ngModel)]="currencyText"
              [ngModelOptions]="{ standalone: true }"
              class="form-control"
              id="currencyText"
            />
            <p><small> Search in currency</small></p>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input
              type="text"
              [(ngModel)]="dateText"
              [ngModelOptions]="{ standalone: true }"
              class="form-control"
              id="dateText"
            />
            <p><small> Search in date</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

*/
