
import { Application, User } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, FileTextIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { mockUsers } from "@/data/mock";

interface ApplicationDetailProps {
  application: Application;
  open: boolean;
  onClose: () => void;
  onAssign: (userId: string) => void;
}

export function ApplicationDetail({ application, open, onClose, onAssign }: ApplicationDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{application.reference}</Badge>
            <Badge
              className={
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : application.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }
            >
              {application.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-semibold mt-2">
            {application.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Location</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {application.location.address}
              </div>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                Map View (Integration pending)
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Assignment</h3>
              <div className="flex items-center space-x-4">
                <Select
                  value={application.assignedTo?.id}
                  onValueChange={onAssign}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Documents</h3>
              <div className="space-y-2">
                {application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <FileTextIcon className="h-4 w-4" />
                      <span>{doc.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{application.description}</p>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Submitted on {format(new Date(application.submittedDate), "PPP")}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
