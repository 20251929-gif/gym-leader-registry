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
  styles: `
    nav {
      background: #1f2937;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 0;
      padding: 1rem;
      list-style: none;
    }
    a {
      color: #f9fafb;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    a:hover,
    a:focus-visible {
      text-decoration: underline;
    }
    a.active {
      background: #f9fafb;
      color: #111827;
      font-weight: 600;
    }
  `,
})
export class Navbar {}