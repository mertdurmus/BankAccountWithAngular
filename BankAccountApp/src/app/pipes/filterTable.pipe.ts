import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Transaction } from 'src/models/transaction';

@Pipe({
  name: 'filterTable'
})


export class FilterTablePipe implements PipeTransform {

  transform(value: Transaction[], fiterText?: string): Transaction[] {
    fiterText = fiterText ? fiterText.toLocaleLowerCase() : null;

    return fiterText ? value.filter((p: Transaction ) =>
    p.description.toLocaleLowerCase().indexOf(fiterText) !== -1
    ) : value;
  }

}
