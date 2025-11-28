import { Users, Calendar, DollarSign, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  groupName: string;
  memberCount: number;
  totalSavings: string;
  nextMeeting: string;
  status: "active" | "pending" | "inactive";
  meetingFrequency: string;
}

const GroupCard = ({
  groupName,
  memberCount,
  totalSavings,
  nextMeeting,
  status,
  meetingFrequency
}: GroupCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "inactive":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            {groupName}
          </CardTitle>
          <Badge className={`text-xs ${getStatusColor()}`}>
            {status}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{memberCount}</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-secondary" />
            <div>
              <p className="text-sm font-medium text-foreground">{totalSavings}</p>
              <p className="text-xs text-muted-foreground">Total Savings</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">{nextMeeting}</p>
                <p className="text-xs text-muted-foreground">{meetingFrequency}</p>
              </div>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;