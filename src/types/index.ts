export interface Residency {
  _id:string;
  title: string;
  description: string;
  location: string;
  price: number;
  owner: string;
  isAvailable: boolean;
  facilities: [
    {
      bedrooms: number,
      bathrooms: number,
      area: number
    }
  ];
  images: string[];
  bookings: string[];
  inquiries: string[];
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  bookedVisits: any[];
  favResidenciesID: string[];
  Residency: Residency[];
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Inquiry {
  _id: string;
  residency: string;
  userId: string;
  message: string;
  createdAt: string;
}

export interface Reply {
  id: string;
  userEmail: string;
  message: string;
  date: string;
}