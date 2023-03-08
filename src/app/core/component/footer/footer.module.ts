import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
})
export class FooterModule { }