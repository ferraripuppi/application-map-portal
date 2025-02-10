
import { useState, useEffect } from "react";
import { ApplicationsGrid } from "@/components/applications-grid";
import { ApplicationDetail } from "@/components/application-detail";
import { mockUsers } from "@/data/mock";
import { Application } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fetchPlanningApplications } from "@/services/planningApi";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(
    null
  );
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchPlanningApplications();
        setApplications(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load planning applications. Please try again later.",
          variant: "destructive",
        });
        console.error('Failed to fetch planning applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

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

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading planning applications...</p>
          </div>
        ) : (
          <ApplicationsGrid
            applications={applications}
            onApplicationClick={setSelectedApplication}
          />
        )}

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
