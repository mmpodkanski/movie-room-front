import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HearthButton } from './hearth.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [HearthButton],
  exports: [HearthButton]
})
export class HearthButtonModule { }