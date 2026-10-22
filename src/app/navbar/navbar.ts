import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
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
  `,
styleUrls: ['./navbar.css'],
})
export class Navbar {}