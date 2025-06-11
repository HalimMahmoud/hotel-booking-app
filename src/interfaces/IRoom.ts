interface Facility {
  _id: string;
  name: string;
}

interface CreatedBy {
  _id: string;
  userName: string;
}

export type IRoom = {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: CreatedBy;
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
