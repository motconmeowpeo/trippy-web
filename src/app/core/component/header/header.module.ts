import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, RouterModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule { }