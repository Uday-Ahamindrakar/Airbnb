import { Photo } from "./photo";

export interface Property  {
  id: number;
  title: string;
  description: string;
  city: string;
  address: string;
  country: string;
  price_per_night: number;
  max_guest: number;
  hostId: number;
  status: string;
  photos: Photo[];
}