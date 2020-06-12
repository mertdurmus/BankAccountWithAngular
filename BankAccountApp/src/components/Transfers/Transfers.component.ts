import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/Account.service';
import { Transaction } from 'src/models/transaction';
import { AlertifyService } from 'src/services/Alertify.service';



@Component({
  selector: 'app-Transfers',
  templateUrl: './Transfers.component.html',
  styleUrls: ['./Transfers.component.css'],
  providers: [AccountService]
})
export class TransfersComponent implements OnInit {

  constructor(private accountService: AccountService, private alertifyService: AlertifyService) { }

  transaction: Transaction[];
  filterText = '';
  amountText: number;
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
      if(this.transaction !== undefined){
        setTimeout(() => {this.collectionSize = this.transaction.length; this.transactions(); }, 200);
      }else{
        this.alertifyService.warning('there is no transaction');
      }
    });
  }


  transactions(): Transaction[] {
    return this.transaction
      .map((transaction, i) => ({id: i + 1, ...transaction}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

