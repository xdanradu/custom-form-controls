import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidationRules } from "./validation-rules.enum";

export function isValidRegex(rule: ValidationRules): ValidatorFn {
  const AT_LEAST_EIGHT_REGEX = /^(.{8,})/;
  const LOWER_AND_UPPER_CASE_CHARACTER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])/;
  const DIGIT_REGEX = /^(?=.*[0-9])/;
  const SPECIAL_CHARACTER_REGEX = /^(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/;
  return (control: AbstractControl): ValidationErrors | null => {
    switch (rule) {
      case ValidationRules.AT_LEAST_EIGHT:
        return !AT_LEAST_EIGHT_REGEX.test(control.value) ? {lessThanEight: true} : null;
      case ValidationRules.AT_LEAST_ONE_DIGIT:
        return !DIGIT_REGEX.test(control.value) ? { noDigits: true } : null;
      case ValidationRules.LOWER_AND_UPPER_CASE_CHARACTER:
        return !LOWER_AND_UPPER_CASE_CHARACTER_REGEX.test(control.value) ? { noLowerAndUpper: true } : null;
        case ValidationRules.SPECIAL_CHARACTER:
          return !SPECIAL_CHARACTER_REGEX.test(control.value) ? {noSpecialCharacter: true} : null;
      default:
        return { unrecognizedRule: true };
    }

  };
}