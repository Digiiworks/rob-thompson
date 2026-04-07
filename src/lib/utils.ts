import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE = {
  url: "https://www.robthompson.co.za",
  name: "Rob Thompson Band",
  artist: "Rob Thompson",
  phone: "+27 76 896 7076",
  phoneRaw: "+27768967076",
  whatsapp: "https://wa.me/27768967076",
  email: "bookings@robthompson.co.za",
  instagram: "https://www.instagram.com/robthompsonband/",
  facebook: "https://www.facebook.com/RobThompsonBand/",
  city: "Gqeberha",
  region: "Eastern Cape",
  country: "ZA",
  geo: { lat: -33.9608, lng: 25.6022 },
  depositZAR: 1000,
  depositCents: 100000,
} as const;
