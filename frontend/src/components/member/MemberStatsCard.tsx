import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MemberStatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
}

export function MemberStatsCard({ title, value, change, icon: Icon }: MemberStatsCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {change} from last month
        </div>
      </CardContent>
    </Card>
  );
}
