import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/Account.service';
import { Transaction } from 'src/models/transaction';
import { FilterTablePipe } from 'src/app/pipes/filterTable.pipe';

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
