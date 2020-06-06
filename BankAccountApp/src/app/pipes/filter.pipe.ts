import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from 'src/models/transaction';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Transaction[], fiterText?: string, currencyText?: string): Transaction[] {
    fiterText = fiterText ? fiterText.toLocaleLowerCase() : null;

    return fiterText ? value.filter((p: Transaction ) =>
    // tslint:disable-next-line:max-line-length
    p.description.toLocaleLowerCase().indexOf(fiterText) !== -1 && p.currency.toLocaleLowerCase().indexOf(currencyText) !== -1
    ) : value;
  }

}
