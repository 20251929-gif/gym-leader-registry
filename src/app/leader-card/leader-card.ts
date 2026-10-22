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
  styles: `
    :host {
      display: block;
      padding: 1rem;
      border: 2px solid #4b5563;
      border-left-width: 8px;
      border-radius: 6px;
      background: #f9fafb;
      color: #111827;
    }
    :host(.kanto) {
      border-color: #b91c1c;
      background: #fef2f2;
    }
    :host(.johto) {
      border-color: #ffee06;
      background: #fefce8;
    }
    :host(.hoenn) {
      border-color: #1d4ed8;
      background: #eff6ff;
    }
    h2 {
      margin-top: 0;
    }
    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.25rem 1rem;
    }
    dt {
      font-weight: 600;
    }
    dd {
      margin: 0;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `,
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