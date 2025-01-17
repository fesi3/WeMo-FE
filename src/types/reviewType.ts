export interface Review {
  reviewId: number;
  score: number;
  comment: string;
  location: string;
  planId: number;
  planName: string;
  planImagePath: string;
  category: string;
  address: string;
  nickname: string;
  profileImagePath: string;
  reviewImagePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewApiResponse {
  success: boolean;
  message: string;
  data: {
    reviewCount: number;
    reviewList: Review[];
    pageSize: number;
    page: number;
    totalPage: number;
  };
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

export interface CroppedImageType {
  objectURL: string;
  blobImg: Blob | null;
}

export interface ReviewFormValues {
  score: number;
  comment: string;
  images: File[];
  fileUrls?: string[];
}

export interface ReviewModalProps {
  mode: 'create' | 'edit';
  initialData?: { score: number; comment: string; images?: string[] };
  onSubmit: (data: ReviewFormValues) => void;
  onClose: () => void;
}
