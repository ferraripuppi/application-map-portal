
import { Application, User } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Sarah Chen', avatar: '/placeholder.svg' },
  { id: '2', name: 'Michael Park', avatar: '/placeholder.svg' },
  { id: '3', name: 'Emma Wilson', avatar: '/placeholder.svg' },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    title: 'New Residential Development',
    reference: 'APP/2024/001',
    status: 'pending',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      address: '123 Main Street, London',
    },
    submittedDate: '2024-02-15',
    description: 'Proposal for a new residential development comprising 25 units',
    documents: [
      { id: 'd1', name: 'Site Plan', type: 'pdf', url: '#' },
      { id: 'd2', name: 'Elevations', type: 'pdf', url: '#' },
    ],
  },
  {
    id: '2',
    title: 'Commercial Extension',
    reference: 'APP/2024/002',
    status: 'in-review',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      address: '456 High Street, London',
    },
    assignedTo: mockUsers[0],
    submittedDate: '2024-02-10',
    description: 'Extension to existing commercial premises',
    documents: [
      { id: 'd3', name: 'Floor Plans', type: 'pdf', url: '#' },
      { id: 'd4', name: 'Environmental Report', type: 'pdf', url: '#' },
    ],
  },
];
