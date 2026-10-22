import { Component, computed, DOCUMENT, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GymLeaderService } from '../gym-leader';
import { LeaderCard } from '../leader-card/leader-card';

type RegionFilter = 'All' | 'Kanto' | 'Johto' | 'Hoenn';

@Component({
  selector: 'app-leader-list',
  imports: [LeaderCard],
  template: `
    <h1>Gym Leaders</h1>

    <div role="group" aria-label="Filter by region" class="filters">
      @for (region of regions; track region) {
        <button
          type="button"
          [attr.aria-pressed]="selectedRegion() === region"
          [class.selected]="selectedRegion() === region"
          (click)="selectedRegion.set(region)"
        >
          {{ region }}
        </button>
      }
    </div>

    @if (errorMessage()) {
      <p role="alert" class="error">{{ errorMessage() }}</p>
    }

    <ul class="cards">
      @for (leader of filteredLeaders(); track leader._id) {
        <li>
          <app-leader-card
            [leader]="leader"
            (edit)="editLeader($event)"
            (remove)="removeLeader($event)"
          />
        </li>
      } @empty {
        <li>No Gym Leaders registered yet.</li>
      }
    </ul>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .filters button.selected {
      background: #1f2937;
      color: #f9fafb;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
      padding: 0;
      list-style: none;
    }
    .error {
      color: #b91c1c;
    }
  `,
})
export class LeaderList {
  private readonly service = inject(GymLeaderService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  protected readonly regions: RegionFilter[] = ['All', 'Kanto', 'Johto', 'Hoenn'];
  protected readonly selectedRegion = signal<RegionFilter>('All');
  protected readonly errorMessage = signal('');

  protected readonly filteredLeaders = computed(() => {
    const region = this.selectedRegion();
    const leaders = this.service.leaders();
    if (region === 'All') {
      return leaders;
    }
    return leaders.filter((l) => l.region.toLowerCase() === region.toLowerCase());
  });

  constructor() {
    this.service.fetchLeaders();
  }

  protected editLeader(id: string): void {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  protected removeLeader(id: string): void {
    const leader = this.service.leaders().find((l) => l._id === id);
    if (!leader) {
      return;
    }

    const confirmed = this.document.defaultView?.confirm(
      `Remove ${leader.name} from the registry?`,
    );
    if (!confirmed) {
      return;
    }

    this.errorMessage.set('');
    this.service.deleteLeader(id).subscribe({
      error: () => this.errorMessage.set(`Could not remove ${leader.name}. Please try again.`),
    });
  }
}