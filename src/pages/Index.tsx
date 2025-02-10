
import { useState } from "react";
import { ApplicationsGrid } from "@/components/applications-grid";
import { ApplicationDetail } from "@/components/application-detail";
import { mockApplications, mockUsers } from "@/data/mock";
import { Application } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Index() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(
    null
  );
  const [applications, setApplications] = useState(mockApplications);

  const handleAssign = (userId: string) => {
    const assignedUser = mockUsers.find((user) => user.id === userId);
    if (!selectedApplication || !assignedUser) return;

    const updatedApplications = applications.map((app) =>
      app.id === selectedApplication.id
        ? { ...app, assignedTo: assignedUser }
        : app
    );

    setApplications(updatedApplications);
    setSelectedApplication({ ...selectedApplication, assignedTo: assignedUser });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Planning Applications</h1>
          <p className="text-muted-foreground mt-2">
            Manage and review planning applications
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            className="pl-10"
          />
        </div>

        <ApplicationsGrid
          applications={applications}
          onApplicationClick={setSelectedApplication}
        />

        {selectedApplication && (
          <ApplicationDetail
            application={selectedApplication}
            open={!!selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onAssign={handleAssign}
          />
        )}
      </div>
    </div>
  );
}
