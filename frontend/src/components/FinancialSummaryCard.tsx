import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialSummaryCardProps {
  title: string;
  amount: string;
  trend: number;
  icon: "dollar" | "users" | "up" | "down";
  type?: "default" | "success" | "warning" | "info";
}

const FinancialSummaryCard = ({
  title,
  amount,
  trend,
  icon,
  type = "default"
}: FinancialSummaryCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "dollar":
        return <DollarSign className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "up":
        return <TrendingUp className="h-5 w-5" />;
      case "down":
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`${getTypeColor()}`}>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {amount}
        </div>
        <div className="flex items-center text-xs">
          {trend > 0 ? (
            <TrendingUp className="h-3 w-3 text-success mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive mr-1" />
          )}
          <span className={trend > 0 ? "text-success" : "text-destructive"}>
            {Math.abs(trend)}% from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;