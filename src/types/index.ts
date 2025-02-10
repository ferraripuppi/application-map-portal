
export interface Application {
  id: string;
  title: string;
  reference: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  submittedDate: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  description: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}
