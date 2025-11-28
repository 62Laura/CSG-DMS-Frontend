import { Clock, DollarSign, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: "contribution" | "loan" | "meeting" | "member";
  description: string;
  amount?: string;
  timestamp: string;
  groupName: string;
}

const RecentActivityCard = () => {
  const activities: Activity[] = [
    {
      id: "1",
      type: "contribution",
      description: "Jean contributed to monthly savings",
      amount: "25,000 RWF",
      timestamp: "2 hours ago",
      groupName: "Kigali Women's Group"
    },
    {
      id: "2",
      type: "meeting",
      description: "Weekly meeting scheduled",
      timestamp: "4 hours ago",
      groupName: "Unity Savings Circle"
    },
    {
      id: "3",
      type: "loan",
      description: "Marie received emergency loan",
      amount: "100,000 RWF",
      timestamp: "1 day ago",
      groupName: "Gasabo Cooperative"
    },
    {
      id: "4",
      type: "member",
      description: "New member joined the group",
      timestamp: "2 days ago",
      groupName: "Hope Builders"
    },
    {
      id: "5",
      type: "contribution",
      description: "Monthly savings goal achieved",
      amount: "500,000 RWF",
      timestamp: "3 days ago",
      groupName: "Kigali Women's Group"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contribution":
        return <DollarSign className="h-4 w-4 text-success" />;
      case "loan":
        return <DollarSign className="h-4 w-4 text-warning" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-info" />;
      case "member":
        return <Users className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

 const getActivityBadge = (type: string) => {
  switch (type) {
    case "contribution":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Contribution</Badge>;
    case "loan":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Loan</Badge>;
    case "meeting":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Meeting</Badge>;
    case "member":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Member</Badge>;
    default:
      return <Badge variant="secondary">Activity</Badge>;
  }
};

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.description}
                </p>
                {getActivityBadge(activity.type)}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activity.groupName}</span>
                <span>{activity.timestamp}</span>
              </div>
              {activity.amount && (
                <p className="text-sm font-semibold text-secondary mt-1">
                  {activity.amount}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;