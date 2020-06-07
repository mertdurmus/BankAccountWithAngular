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
  page = 1;
  pageSize = 4;
  collectionSize;

  ngOnInit() {
    this.getLastEvent();
  }

  getLastEvent(){
    this.accountService.getLastEvent().then(value => {
      this.transaction = value;
      setTimeout(() => {this.collectionSize = this.transaction.length; this.transactions(); }, 200);
    });
  }


  transactions(): Transaction[] {
    return this.transaction
      .map((transaction, i) => ({id: i + 1, ...transaction}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

