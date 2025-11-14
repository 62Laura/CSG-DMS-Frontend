import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  type: 'meeting' | 'contribution' | 'loan' | 'other' | 'payment' | 'deadline' | 'event';
  date: string;
  description: string;
  location?: string;
}

interface UpcomingEventsProps {
  events: Event[];
  className?: string;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'meeting':
      return <Users className="h-4 w-4 text-blue-500" />;
    case 'payment':
      return <Calendar className="h-4 w-4 text-green-500" />;
    case 'deadline':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Calendar className="h-4 w-4 text-purple-500" />;
  }
};

export function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No upcoming events</div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-muted">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  {event.location && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
