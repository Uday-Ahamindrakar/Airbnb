export interface Property {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  images: string[]; // optional
  rating?: number;
}
