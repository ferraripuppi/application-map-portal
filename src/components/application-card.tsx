
import { Application } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileTextIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ApplicationCardProps {
  application: Application;
  onClick: () => void;
}

export function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "in-review": "bg-blue-100 text-blue-800",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onClick={onClick}
      >
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{application.reference}</Badge>
            <Badge className={statusColors[application.status]}>
              {application.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg">{application.title}</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {application.location.address}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(new Date(application.submittedDate), 'PPP')}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <FileTextIcon className="mr-2 h-4 w-4" />
            {application.documents.length} Documents
          </div>
        </CardContent>
        <CardFooter>
          {application.assignedTo ? (
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={application.assignedTo.avatar} />
                <AvatarFallback>
                  {application.assignedTo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                Assigned to {application.assignedTo.name}
              </span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Unassigned</span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
