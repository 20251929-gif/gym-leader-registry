export interface GymLeader {
  _id?: string;
  name: string;
  region: string;
  town: string;
  badge: string;
  specialty: string;
  aceLevel: number; // 1-100, validated by the server
}