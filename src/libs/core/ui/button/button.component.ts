import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() className!: string;
  @Input() disabled = false;
  @Input() loading?: boolean = false;
  @Input() type:
    | 'basic'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'grey'
    | 'dangerous' = 'primary';
  @Input() isButtonSubmit = false;

  readonly TYPES = {
    custom: 'bg-white disabled:opacity-80',
    basic: 'bg-white text-grey-200 shadow-base',
    primary:
      'bg-primary text-white hover:bg-opacity-80 disabled:bg-primary',
    secondary:
      'bg-white hover:bg-secondary disabled:bg-grey-500 text-surface-80 border border-outline',
    outline:
      'bg-white text-primary-600 outline outline-1  outline-primary-600 hover:bg-background-1',
    grey: 'bg-grey-300 text-white',
    dangerous: 'bg-pink-500 text-white hover:bg-opacity-80',
  };

  get classes(): string {
    return `${this.TYPES[this.type]} ${this.className}`;
  }
}
