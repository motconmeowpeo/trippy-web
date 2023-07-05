import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Output() scrollEvent = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isVisible) {
      this.scrollEvent.emit();
    }
  }

}
