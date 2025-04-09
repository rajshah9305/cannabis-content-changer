
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, PieChart } from 'lucide-react';

const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground mt-2">
          Visualize your consumption patterns and gain insights.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consumption by Method</CardTitle>
            <CardDescription>
              Distribution of your consumption methods over time
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-80">
            <div className="flex flex-col items-center">
              <PieChart className="h-16 w-16 text-cannabis-300" />
              <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Consumption Frequency</CardTitle>
            <CardDescription>
              Track how often you consume cannabis
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-80">
            <div className="flex flex-col items-center">
              <BarChart className="h-16 w-16 text-cannabis-300" />
              <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Effect Analysis</CardTitle>
            <CardDescription>
              See which effects you experience most frequently
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-80">
            <div className="flex flex-col items-center">
              <BarChart className="h-16 w-16 text-cannabis-300" />
              <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rating Trends</CardTitle>
            <CardDescription>
              See how your ratings change over time
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-80">
            <div className="flex flex-col items-center">
              <LineChart className="h-16 w-16 text-cannabis-300" />
              <p className="text-sm text-muted-foreground mt-4">Coming soon!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;
