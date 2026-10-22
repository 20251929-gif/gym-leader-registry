import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GymLeader } from './gym-leader.model';

@Service()
export class GymLeaderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/leaders';

  readonly leaders = signal<GymLeader[]>([]);

  readonly kantoCount = computed(() => this.countByRegion('kanto'));
  readonly johtoCount = computed(() => this.countByRegion('johto'));
  readonly hoennCount = computed(() => this.countByRegion('hoenn'));

  fetchLeaders(): void {
    this.http
      .get<GymLeader[]>(this.apiUrl)
      .subscribe((data) => this.leaders.set(data));
  }

  getLeader(id: string): Observable<GymLeader> {
    return this.http.get<GymLeader>(`${this.apiUrl}/${id}`);
  }

  addLeader(leader: GymLeader): Observable<GymLeader> {
    return this.http
      .post<GymLeader>(this.apiUrl, leader)
      .pipe(tap((created) => this.leaders.update((list) => [...list, created])));
  }

  updateLeader(id: string, leader: GymLeader): Observable<GymLeader> {
    return this.http
      .put<GymLeader>(`${this.apiUrl}/${id}`, leader)
      .pipe(
        tap((updated) =>
          this.leaders.update((list) => list.map((l) => (l._id === id ? updated : l))),
        ),
      );
  }

  deleteLeader(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.leaders.update((list) => list.filter((l) => l._id !== id))));
  }

  private countByRegion(region: string): number {
    return this.leaders().filter((l) => l.region.toLowerCase() === region).length;
  }
}