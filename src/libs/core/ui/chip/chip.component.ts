import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input() text!: string;
  @Input() isRemovable?: boolean = true;
  @Input() className!: string;
  @Input() backgroundColor!: string;
  @Output() handleRemove: EventEmitter<void> = new EventEmitter<void>();

  clickRemove(e: Event) {
    e.stopPropagation();
    this.handleRemove.emit();
  }
}
