interface DatePickerState {
  disabled: boolean;
  required: boolean;
}

type AllowSelectionType = 'allowAllDays' | 'onlyWorkingDays' | 'onlyWeekends';
type StartViewType = 'month' | 'year' | 'multi-year';

interface DatePickerConstraints {
  minimumSelectableDate: CustomDate;
  maximumSelectableDate: CustomDate;
  allowSelection: AllowSelectionType;
  startView: StartViewType;
  startViewDate: CustomDate;
}

export class CustomDate {
  year: number;
  month: number;
  day: number;

  constructor(obj: any) {
    if (!isEmpty(obj) && !isValidDate(obj)) {
      console.log(`Values provided cannot compose a date. Using null instead.`, obj);
      return;
    }
    this.year = (obj.year || null) && isPositiveInteger(obj.year) ? obj.year : -1;
    this.month = (obj.month || null) && isPositiveInteger(obj.month) ? obj.month : -1;
    this.day = (obj.day || null) && isPositiveInteger(obj.day) ? obj.day : -1;
  }
}

/**
 *     {
      'name': 'required',
      'type': 'required',
      'expression': '',
      'message': 'Please provide a date'
    }
 */
export class Validation {
  name: string;
  type: string;
  expression: string;
  message: string;

  constructor(obj: any) {
    if (!(obj.name && obj.type)) {
      return;
    }
    this.name = obj.name;
    this.type = obj.type;
    this.expression = obj.expression || null;
    this.message = obj.message || 'Missing message in config!!';
  }
}

export class DatePickerConfig {
  public type: string;
  public name: string;
  public value: CustomDate;
  public placeholder: string;
  public state: DatePickerState;
  public constraints: DatePickerConstraints;
  public validations: Validation[];

  constructor(obj: any) {
    if (!obj || obj.type !== 'datepicker') {
      return;
    }
    if (!obj.name) {
      console.log(`${obj.type} - missing mandatory field name. Excluding object.`);
      return;
    }
    // avoid undefined errors
    if (!obj.hasOwnProperty('state')) { obj.state = {}; }
    if (!obj.hasOwnProperty('constraints')) { obj.constraints = {}; }
    if (!obj.hasOwnProperty('validations')) { obj.validations = []; }

    this.type = obj.type;
    this.name = obj.name;
    this.placeholder = obj.placeholder || '';
    this.value = isValidDate(new CustomDate(obj.value || {})) ? new CustomDate(obj.value) : null;

    this.state = {
      disabled: (obj.state || {}).disabled && isBoolean((obj.state || {}).disabled) || false,
      required: (obj.state || {}).required && isBoolean((obj.state || {}).required) || false
    };

    const allowedSelectionOptions = ['allowAllDays', 'onlyWorkingDays', 'onlyWeekends'];
    const startViewOptions = ['month', 'year', 'multi-year'];
    this.constraints = {
      minimumSelectableDate: isValidDate(new CustomDate(obj.constraints.minimumSelectableDate || {})) ?
        new CustomDate(obj.constraints.minimumSelectableDate) : null,
      maximumSelectableDate: isValidDate(new CustomDate(obj.constraints.maximumSelectableDate || {})) ?
        new CustomDate(obj.constraints.maximumSelectableDate) : null,
      allowSelection: allowedSelectionOptions.includes((obj.constraints.allowSelection || '').trim()) ?
        obj.constraints.allowSelection.trim() : 'allowAllDays',
      startView: startViewOptions.includes((obj.constraints.startView || '').trim()) ? obj.constraints.startView.trim() : 'month',
      startViewDate: isValidDate(new CustomDate(obj.constraints.startViewDate || {})) ?
        new CustomDate(obj.constraints.startViewDate) : null
    };
    this.validations = [...obj.validations.map(eachValidation => new Validation(eachValidation))];
  }

}


/**
 * CustomDate sample object
 * {
      'year': 2000,
      'month': 11,
      'day': 18
    }
 */
export function isValidDate(testDate: CustomDate) {
  const validMonths = Array.from({ length: 12 }, (v, i) => i + 1);
  const validDays = Array.from({ length: 31 }, (v, i) => i + 1);
  const isDateValidEval = testDate &&
    (testDate.year && isPositiveInteger(testDate.year)) &&
    (testDate.month && validMonths.includes(testDate.month)) &&
    (testDate.day && validDays.includes(testDate.day));
  return isDateValidEval;
}

export function isPositiveInteger(val: any) {
  return Number.isInteger(val) && val > 0;
}

export function isEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function isBoolean(val) {
  // type coercion
  return !!val === val;
  // typeof compare
  // return (typeof val === typeof true);
}

const configSample = {
  'type': 'datepicker',
  'name': 'datepicker1',
  'placeholder': 'Please select date',
  'state': {
    'disabled': true,
    'required': true
  },
  'value': {},
  'constraints': {
    'minimumSelectableDate': {
      'year': 2000,
      'month': 11,
      'day': 18
    },
    'maximumSelectableDate': {
      'year': 2001,
      'month': 11,
      'day': 18
    },
    'allowSelection': 'allowAllDays',
    'startView': 'year',
    'startViewDate': {
      'year': 2001,
      'month': 11,
      'day': 18
    }
  },
  'validations': [
    {
      'name': 'required',
      'type': 'required',
      'expression': '',
      'message': 'Please provide a date'
    },
    {
      'name': 'pattern',
      'type': 'pattern',
      'expression': '^[a-zA-Z]+$',
      'message': 'Accept only text'
    }
  ]
};
