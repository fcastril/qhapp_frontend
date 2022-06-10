import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolTOstring'
})
export class BoolTOstringPipe implements PipeTransform {

  transform(value: boolean): string {

    let rpta = '';

    if(value){
      rpta = 'ACTIVO';
    }else{
      rpta = 'INACTIVO';
    }
    return rpta;
  }

}
