import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h1>Page not found</h1>
    <p>The page you were looking for doesn't exist.</p>
    <a routerLink="/home">Back to Home</a>
  `,
  styleUrls: ['./not-found.css'],
})
export class NotFound {}