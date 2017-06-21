export class Todo {
  id: number;
  name: string = '';
  description: string = '';
  date: string = 'Mon 12, 2017, 8:59 PM';
  icon: boolean = true;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

