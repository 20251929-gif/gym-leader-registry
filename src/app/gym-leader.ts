import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { GymLeader } from './gym-leader.model';

@Service()
export class GymLeaderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/leaders';

  readonly leaders = signal<GymLeader[]>([]);

  fetchLeaders(): void {
    this.http
      .get<GymLeader[]>(this.apiUrl)
      .subscribe((data) => this.leaders.set(data));
  }

  saveLeader(data: GymLeader): Observable<GymLeader> {
    return this.http.post<GymLeader>(this.apiUrl, data);
  }

  deleteLeader(id: string): void {
    this.http
      .delete(`${this.apiUrl}/${id}`)
      .subscribe(() =>
        this.leaders.update((list) => list.filter((l) => l._id !== id)),
      );
  }

  updateLeader(id: string, data: GymLeader): Observable<GymLeader> {
    return this.http.put<GymLeader>(`${this.apiUrl}/${id}`, data);
  }
}