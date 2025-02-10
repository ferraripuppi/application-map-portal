
const PLANNING_API_BASE_URL = 'https://www.planning.data.gov.uk/entity';

export interface PlanningApiResponse {
  applicationReference: string;
  locationText: string;
  proposal: string;
  decisionDate: string;
  status: string;
  geometry: {
    coordinates: [number, number];
  };
}

export async function fetchPlanningApplications(): Promise<Application[]> {
  const response = await fetch(`${PLANNING_API_BASE_URL}?limit=10`);
  const data = await response.json();
  
  return data.map((item: PlanningApiResponse) => ({
    id: item.applicationReference,
    title: item.proposal,
    reference: item.applicationReference,
    status: mapStatus(item.status),
    location: {
      lat: item.geometry?.coordinates[1] || 0,
      lng: item.geometry?.coordinates[0] || 0,
      address: item.locationText || 'Address not provided',
    },
    submittedDate: item.decisionDate || new Date().toISOString(),
    documents: [], // The API doesn't provide documents
    description: item.proposal,
  }));
}

function mapStatus(apiStatus: string): 'pending' | 'approved' | 'rejected' | 'in-review' {
  const status = apiStatus.toLowerCase();
  if (status.includes('granted') || status.includes('approved')) return 'approved';
  if (status.includes('refused') || status.includes('rejected')) return 'rejected';
  if (status.includes('pending')) return 'pending';
  return 'in-review';
}
