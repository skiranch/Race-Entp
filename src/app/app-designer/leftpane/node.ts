export class Node {
  id: number;
  name: string = '';
  button?: boolean = false

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

