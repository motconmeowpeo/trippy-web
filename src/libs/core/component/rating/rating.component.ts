import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingStarsComponent {
  faStar = faStar;
  stars = [0, 1, 2, 3, 4];
  @Input() selectedStar = -1;
  @Input() disable = false;
  hoveredStar = -1;

  @Output() handleRate: EventEmitter<number> = new EventEmitter<number>();
  hoverStar(index: number) {
    if (!this.disable) this.hoveredStar = index;
  }

  selectStar(index: number) {
    if (!this.disable) {
      this.selectedStar = index;
      this.handleRate.emit(index);
    }
  }

  resetHoveredStar() {
    this.hoveredStar = -1;
  }
}
