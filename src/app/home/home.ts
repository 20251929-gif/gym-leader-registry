import { Component, inject } from '@angular/core';
import { GymLeaderService } from '../gym-leader';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome to the Gym Leader Registry</h1>
    <p>Browse, add, and manage Gym Leaders across the regions.</p>

    <h2>Leaders per region</h2>
    <ul>
      <li>Kanto: {{ service.kantoCount() }}</li>
      <li>Johto: {{ service.johtoCount() }}</li>
      <li>Hoenn: {{ service.hoennCount() }}</li>
    </ul>
  `,
})
export class Home {
  protected readonly service = inject(GymLeaderService);

  constructor() {
    this.service.fetchLeaders();
  }
}