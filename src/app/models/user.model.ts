export interface User {
    id: string;              // ← este campo representa el _id de MongoDB
    name: string;
    email: string;
    phone?: string;
    photo?: string | null;
    createdAt?: string;
    memorials?: string[];
  }