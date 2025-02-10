
import { Application } from "@/types";

const PLANNING_API_BASE_URL = 'https://www.planning.data.gov.uk/entity';

export interface PlanningApiResponse {
  reference: string;
  name: string;
  description: string;
  event: {
    decision: {
      date: string;
      status: string;
    };
  };
  geographicalCoverage: {
    address: string;
    point: {
      coordinates: [number, number];
    };
  };
}

export async function fetchPlanningApplications(): Promise<Application[]> {
  const response = await fetch(`${PLANNING_API_BASE_URL}?dataset=planning-application&limit=10`);
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error('Invalid API response format');
  }

  return data.map((item: PlanningApiResponse) => ({
    id: item.reference,
    title: item.name || 'Untitled Application',
    reference: item.reference,
    status: mapStatus(item.event?.decision?.status || ''),
    location: {
      lat: item.geographicalCoverage?.point?.coordinates[1] || 0,
      lng: item.geographicalCoverage?.point?.coordinates[0] || 0,
      address: item.geographicalCoverage?.address || 'Address not provided',
    },
    submittedDate: item.event?.decision?.date || new Date().toISOString(),
    documents: [], // The API doesn't provide documents in this endpoint
    description: item.description || item.name || 'No description provided',
  }));
}

function mapStatus(apiStatus: string): 'pending' | 'approved' | 'rejected' | 'in-review' {
  const status = apiStatus.toLowerCase();
  if (status.includes('granted') || status.includes('approved')) return 'approved';
  if (status.includes('refused') || status.includes('rejected')) return 'rejected';
  if (status.includes('pending')) return 'pending';
  return 'in-review';
}
