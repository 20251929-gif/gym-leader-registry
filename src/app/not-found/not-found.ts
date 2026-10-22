import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-not-found',
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
      <h1>Page not found</h1>
      <p>The page you were looking for doesn't exist.</p>
      <a routerLink="/home">Back to Home</a>
    </main>
  `,
})
export class NotFound {}