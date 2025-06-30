import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { selectCounters } from '../features/counter/store/counter.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
   counterLength$ = this.store.select(selectCounters);

  constructor(private store: Store) {}
}