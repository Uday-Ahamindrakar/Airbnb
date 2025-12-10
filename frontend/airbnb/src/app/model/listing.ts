export interface Listing {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  images: string[]; // optional
  rating?: number;
}
