
import { Application } from "@/types";
import { ApplicationCard } from "./application-card";

interface ApplicationsGridProps {
  applications: Application[];
  onApplicationClick: (application: Application) => void;
}

export function ApplicationsGrid({ applications, onApplicationClick }: ApplicationsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onClick={() => onApplicationClick(application)}
        />
      ))}
    </div>
  );
}
