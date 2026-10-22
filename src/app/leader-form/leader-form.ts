import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GymLeaderService } from '../gym-leader';
import { GymLeader } from '../gym-leader.model';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-leader-form',
    imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
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
    <h1>{{ heading() }}</h1>

    @if (errorMessage()) {
      <p role="alert" class="error">{{ errorMessage() }}</p>
    }

    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" aria-describedby="name-error" />
        <div id="name-error" class="error" role="alert">
          @if (controls.name.touched && controls.name.invalid) {
            @if (controls.name.hasError('required')) {
              Name is required.
            } @else {
              Name must be at least 2 characters.
            }
          }
        </div>
      </div>

      <div class="field">
        <label for="region">Region</label>
        <select id="region" formControlName="region" aria-describedby="region-error">
          <option value="" disabled>Select a region</option>
          @for (region of regions; track region) {
            <option [value]="region">{{ region }}</option>
          }
        </select>
        <div id="region-error" class="error" role="alert">
          @if (controls.region.touched && controls.region.invalid) {
            Region is required.
          }
        </div>
      </div>

      <div class="field">
        <label for="town">Town</label>
        <input id="town" type="text" formControlName="town" aria-describedby="town-error" />
        <div id="town-error" class="error" role="alert">
          @if (controls.town.touched && controls.town.invalid) {
            Town is required.
          }
        </div>
      </div>

      <div class="field">
        <label for="badge">Badge</label>
        <input id="badge" type="text" formControlName="badge" aria-describedby="badge-error" />
        <div id="badge-error" class="error" role="alert">
          @if (controls.badge.touched && controls.badge.invalid) {
            Badge is required.
          }
        </div>
      </div>

      <div class="field">
        <label for="specialty">Specialty</label>
        <input
          id="specialty"
          type="text"
          formControlName="specialty"
          aria-describedby="specialty-error"
        />
        <div id="specialty-error" class="error" role="alert">
          @if (controls.specialty.touched && controls.specialty.invalid) {
            Specialty is required.
          }
        </div>
      </div>

      <div class="field">
        <label for="aceLevel">Ace level</label>
        <input
          id="aceLevel"
          type="number"
          formControlName="aceLevel"
          aria-describedby="aceLevel-error"
        />
        <div id="aceLevel-error" class="error" role="alert">
          @if (controls.aceLevel.touched && controls.aceLevel.invalid) {
            Ace level must be between 1 and 100.
          }
        </div>
      </div>

      <div class="field">
        <label for="motto">Motto (optional)</label>
        <textarea id="motto" formControlName="motto" aria-describedby="motto-error"></textarea>
        <div id="motto-error" class="error" role="alert">
          @if (controls.motto.touched && controls.motto.invalid) {
            Motto must be 150 characters or fewer.
          }
        </div>
      </div>

      <div class="actions">
        <button type="submit" [disabled]="form.invalid || saving()">{{ submitLabel() }}</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `,
  styles: `
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1rem;
      max-width: 28rem;
    }
    .error {
      color: #b91c1c;
      min-height: 1.25rem;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `,
})
export class LeaderForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(GymLeaderService);
  private readonly router = inject(Router);

  /** Bound from the `:id` route parameter; undefined in Add mode. */
  readonly id = input<string>();

  protected readonly regions = ['Kanto', 'Johto', 'Hoenn'];
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly isEdit = computed(() => !!this.id());
  protected readonly heading = computed(() =>
    this.isEdit() ? 'Edit Gym Leader' : 'Register a Gym Leader',
  );
  protected readonly submitLabel = computed(() => (this.isEdit() ? 'Save Changes' : 'Add Leader'));

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    motto: ['', Validators.maxLength(150)],
  });

  protected readonly controls = this.form.controls;

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.loadLeader(id);
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const leader: GymLeader = this.form.getRawValue();
    const id = this.id();
    const request$ = id ? this.service.updateLeader(id, leader) : this.service.addLeader(leader);

    this.saving.set(true);
    this.errorMessage.set('');
    request$.subscribe({
      next: () => {
        this.form.reset();
        this.saving.set(false);
        this.router.navigate(['/leaders']);
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Could not save the Gym Leader. Please try again.');
      },
    });
  }

  protected cancel(): void {
    this.router.navigate(['/leaders']);
  }

  private loadLeader(id: string): void {
    this.service.getLeader(id).subscribe({
      next: (leader) => this.form.patchValue(leader),
      error: () => this.errorMessage.set('Could not load that Gym Leader.'),
    });
  }
}