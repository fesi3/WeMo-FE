export interface Review {
  reviewId: number;
  score: number;
  comment: string;
  planImagePath: string;
  planName: string;
  location: string;
  createdAt: string;
}

export interface SubRegionOption {
  id: number;
  name: string;
}

export interface RegionOption {
  id: number;
  name: string;
  subRegions: SubRegionOption[];
}

export interface FilterState {
  region: RegionOption | null;
  subRegion: SubRegionOption | null;
  date: Date | null;
  sort: { id: number; name: string } | null;
}
