import {AbstractControl, ValidatorFn} from "@angular/forms";

export class DateAfterTodayValidator {
  static isAfterToday(dateField1: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const date1 = c.get(dateField1).value;
      if (date1 !== null && date1 < Date.now()) {
        return validatorField;
      }
      return null;
    };
  }
}
