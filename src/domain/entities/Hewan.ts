export type HewanStatus = 'tersedia' | 'terjual';

export const HEWAN_STATUS_OPTIONS: { label: string; value: HewanStatus }[] = [
  { label: 'Tersedia', value: 'tersedia' },
  { label: 'Terjual', value: 'terjual' },
];

export interface Hewan {
  id?: number;
  nama: string;
  jenis: string;
  tanggal_lahir?: string;
  harga: number;
  status?: HewanStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}