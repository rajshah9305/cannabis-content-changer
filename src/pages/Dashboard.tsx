
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart } from 'lucide-react';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import ConsumptionCard from '@/components/ConsumptionCard';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { consumptionEntries, deleteConsumptionEntry } = useConsumptionStore();
  const { toast } = useToast();

  // Get recent entries (last 5)
  const recentEntries = consumptionEntries.slice(0, 5);

  // Calculate stats
  const todayEntries = consumptionEntries.filter(entry => 
    format(new Date(entry.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  
  const weekEntries = consumptionEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - entryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  });

  // Extract favorite strains
  const favoriteStrains = consumptionEntries
    .filter(entry => entry.strain.favorite)
    .map(entry => entry.strain.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .slice(0, 3);

  // Calculate average rating
  const avgRating = consumptionEntries.length > 0 
    ? (consumptionEntries.reduce((sum, entry) => sum + entry.rating, 0) / consumptionEntries.length).toFixed(1)
    : '0';

  // Handle deletion
  const handleDelete = (id: string) => {
    deleteConsumptionEntry(id);
    toast({
      title: "Entry deleted",
      description: "The consumption entry has been deleted.",
    });
  };

  // Mock function for edit (will be implemented in a different view)
  const handleEdit = () => {
    toast({
      title: "Feature coming soon",
      description: "Editing will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage your cannabis consumption patterns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Consumption</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEntries.length}</div>
            <p className="text-xs text-muted-foreground">Entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weekEntries.length}</div>
            <p className="text-xs text-muted-foreground">Entries in 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Strains</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 21a9 9 0 0 0 0-18" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h16.8" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favoriteStrains.length}</div>
            <p className="text-xs text-muted-foreground">
              {favoriteStrains.length > 0 ? favoriteStrains.join(', ') : 'None yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Entries</TabsTrigger>
          <TabsTrigger value="charts" disabled>Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          {recentEntries.length > 0 ? (
            recentEntries.map(entry => (
              <ConsumptionCard 
                key={entry.id} 
                entry={entry} 
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No entries yet. Start tracking your consumption!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Consumption by Method</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-80">
                <BarChart className="h-16 w-16 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consumption Over Time</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-80">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
