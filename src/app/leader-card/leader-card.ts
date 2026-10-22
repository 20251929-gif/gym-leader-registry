import { Component, computed, input, output } from '@angular/core';
import { GymLeader } from '../gym-leader.model';

@Component({
  selector: 'app-leader-card',
  host: {
    '[class.kanto]': "region() === 'kanto'",
    '[class.johto]': "region() === 'johto'",
    '[class.hoenn]': "region() === 'hoenn'",
  },
  template: `
    <h2>{{ leader().name }}</h2>
    <dl>
      <dt>Region</dt>
      <dd>{{ leader().region }}</dd>
      <dt>Town</dt>
      <dd>{{ leader().town }}</dd>
      <dt>Badge</dt>
      <dd>{{ leader().badge }}</dd>
      <dt>Specialty</dt>
      <dd>{{ leader().specialty }}</dd>
      <dt>Ace level</dt>
      <dd>{{ leader().aceLevel }}</dd>
      <dt>Motto</dt>
      <dd>{{ leader().motto || 'N/A' }}</dd>
    </dl>
    <div class="actions">
      <button type="button" (click)="onEdit()" [attr.aria-label]="'Edit ' + leader().name">
        Edit
      </button>
      <button type="button" (click)="onRemove()" [attr.aria-label]="'Remove ' + leader().name">
        Remove
      </button>
    </div>
  `,
  styleUrls: ['./leader-card.css'],
})
export class LeaderCard {
  readonly leader = input.required<GymLeader>();
  readonly edit = output<string>();
  readonly remove = output<string>();

  protected readonly region = computed(() => this.leader().region.toLowerCase());

  protected onEdit(): void {
    const id = this.leader()._id;
    if (id) {
      this.edit.emit(id);
    }
  }

  protected onRemove(): void {
    const id = this.leader()._id;
    if (id) {
      this.remove.emit(id);
    }
  }
}