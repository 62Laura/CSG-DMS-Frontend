import { Plus, Users, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickActions = () => {
  const actions = [
    {
      title: "Create New Group",
      description: "Start a new savings group",
      icon: Plus,
      variant: "default" as const,
      color: "text-primary"
    },
    {
      title: "Add Members",
      description: "Invite new group members",
      icon: Users,
      variant: "secondary" as const,
      color: "text-secondary"
    },
    {
      title: "Schedule Meeting",
      description: "Plan next group meeting",
      icon: Calendar,
      variant: "outline" as const,
      color: "text-accent"
    },
    {
      title: "Generate Report",
      description: "Export financial summary",
      icon: FileText,
      variant: "outline" as const,
      color: "text-info"
    }
  ];

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant={action.variant}
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-center space-x-2 w-full">
              <action.icon className={`h-5 w-5 ${action.color}`} />
              <span className="font-medium text-left">{action.title}</span>
            </div>
            <span className="text-xs text-muted-foreground text-left">
              {action.description}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;