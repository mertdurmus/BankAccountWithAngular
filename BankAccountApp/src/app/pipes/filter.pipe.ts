import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/models/transaction';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Transaction[], fiterText?: string, currencyText?: string, amountText?: number, dateText?: string): Transaction[] {
    fiterText = fiterText ? fiterText.toLocaleLowerCase() : null;
    currencyText = currencyText ? currencyText.toLocaleLowerCase() : null;
    dateText = dateText ? dateText.toLocaleLowerCase() : null;
    if (currencyText) {
      return currencyText ? value.filter((p: Transaction) =>
        p.currency.toLocaleLowerCase().indexOf(currencyText) !== -1
      ) : value;
    }
    if (amountText) {
      return amountText ? value.filter((p: Transaction) =>
        p.amount.toString().indexOf(amountText.toString()) !== -1
      ) : value;
    }
    if (dateText) {
      return dateText ? value.filter((p: Transaction) =>
        p.actionDate.toString().indexOf(dateText) !== -1
      ) : value;
    }
    return fiterText ? value.filter((p: Transaction) =>
      p.description.toLocaleLowerCase().indexOf(fiterText) !== -1
    ) : value;
  }

}
