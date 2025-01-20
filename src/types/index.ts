export interface Residency {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  country: string;
  image: string;
  facilities: any;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
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