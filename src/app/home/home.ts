import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GymLeaderService } from '../gym-leader';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a>
        </li>
        <li>
          <a
            routerLink="/leaders"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            ariaCurrentWhenActive="page"
            >Leaders</a
          >
        </li>
        <li>
          <a routerLink="/leaders/new" routerLinkActive="active" ariaCurrentWhenActive="page"
            >Add Leader</a
          >
        </li>
      </ul>
    </nav>

    <main>
      <h1>Welcome to the Gym Leader Registry</h1>
      <p>Browse, add, and manage Gym Leaders across the regions.</p>

      <h2>Leaders per region</h2>
      <ul>
        <li>Kanto: {{ service.kantoCount() }}</li>
        <li>Johto: {{ service.johtoCount() }}</li>
        <li>Hoenn: {{ service.hoennCount() }}</li>
      </ul>
    </main>
  `,
})
export class Home {
  protected readonly service = inject(GymLeaderService);

  constructor() {
    this.service.fetchLeaders();
  }
}