export type User = {
  id: string;
  name: string;
  surname: string;
  pseudo: string;
  email: string;
  phoneNumber: string;
  password: string;
  isSuspend: boolean;
  roles: string[];
  createdat: string;
  updatedat: string;
};

export const mockUsers: User[] = [
  {
    id: "1",
    name: "ngono",
    surname: "jean",
    pseudo: "ngonojean",
    email: "ngonojean@gmail.com",
    phoneNumber: "+237699999999",
    password: "password123",
    isSuspend: false,
    roles: ["ROLE_TRAVELLER", "ROLE_DRIVER"],
    createdat: "2024-01-15T10:30:00Z",
    updatedat: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Thomas",
    surname: "manga",
    pseudo: "tmanga",
    email: "thomas.manga@gmail.com",
    phoneNumber: "+237677889900",
    password: "password123",
    isSuspend: false,
    roles: ["ROLE_DRIVER"],
    createdat: "2024-01-16T14:20:00Z",
    updatedat: "2024-01-16T14:20:00Z"
  },
  {
    id: "3",
    name: "Marie",
    surname: "Fotso",
    pseudo: "mfotso",
    email: "marie.fotso@gmail.com",
    phoneNumber: "+237688776655",
    password: "password123",
    isSuspend: false,
    roles: ["ROLE_TRAVELLER"],
    createdat: "2024-01-17T09:15:00Z",
    updatedat: "2024-01-18T16:45:00Z"
  },
  {
    id: "4",
    name: "Samuel",
    surname: "Dang",
    pseudo: "sdang",
    email: "samuel.dang@gmail.com",
    phoneNumber: "+237699887766",
    password: "password123",
    isSuspend: false,
    roles: ["ROLE_ADMIN"],
    createdat: "2024-01-18T11:00:00Z",
    updatedat: "2024-01-18T11:00:00Z"
  }
];