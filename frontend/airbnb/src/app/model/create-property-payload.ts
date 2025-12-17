import { PropertyPhotoPayload } from "./property-photo-payload";

export interface CreatePropertyPayload {
  title: string;
  description: string;
  city: string;
  address: string;
  country: string;
  price_per_night: number;
  max_guest: number;
  photos: PropertyPhotoPayload[];
}
