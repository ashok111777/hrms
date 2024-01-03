import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  searchFunction(items: any, searcTerm: any) {
    let result;
    let regex = new RegExp(searcTerm, "g");
    for (let item of items) {
      Object.keys(item).map((i: any) => {
        if (i === 'employeeId') {
          console.log(i);
          if (String(item[i]).match(regex)) result = item;
        } else if (i === 'name') {
          console.log(i);
          if (String(item[i]).match(regex)) result = item;
        } else if (i === 'team') {
          console.log(i);
          if (String(item[i]).match(regex)) result = item;
        } else if (i === 'designation') {
          console.log(i);
          if (String(item[i]).match(regex)) result = item;
        }
      });
    }
    if (result === undefined || null) return null;
    else return [result];
  }

  transform(items: any, searchTerm?: any): any {
    if (!items) return null;
    if (!searchTerm) return items;
    let res = this.searchFunction(items, searchTerm);
    // console.log(res);
    if (res === null || undefined) return null;
    return res;
  }

}

