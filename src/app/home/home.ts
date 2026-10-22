import { Component, inject } from '@angular/core';
import { GymLeaderService } from '../gym-leader';

@Component({
  selector: 'app-home',
  template: `
    <section class="card">
      <h1>Welcome to the Gym Leader Registry</h1>
      <p>Browse, add, and manage Gym Leaders across the regions.</p>

      <h2>Leaders per region</h2>
      <ul class="counts">
        <li class="kanto"><span class="number">{{ service.kantoCount() }}</span> Kanto</li>
        <li class="johto"><span class="number">{{ service.johtoCount() }}</span> Johto</li>
        <li class="hoenn"><span class="number">{{ service.hoennCount() }}</span> Hoenn</li>
      </ul>
    </section>
  `,
  styleUrl: './home.css',
})

export class Home {
  protected readonly service = inject(GymLeaderService);

  constructor() {
    this.service.fetchLeaders();
  }
}