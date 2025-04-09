
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, PieChart, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const InsightsPage: React.FC = () => {
  const { consumptionEntries } = useConsumptionStore();
  
  // Extract store data from consumption entries
  const getStoreData = () => {
    const storeMap = new Map();
    
    consumptionEntries.forEach(entry => {
      const store = entry.store || 'Unknown';
      if (!storeMap.has(store)) {
        storeMap.set(store, []);
      }
      storeMap.get(store).push(entry);
    });
    
    return Array.from(storeMap).map(([storeName, entries]) => ({
      storeName,
      entries,
      strainCount: new Set(entries.map(entry => entry.strain.name)).size,
      mostCommonStrain: getMostCommonStrain(entries),
    }));
  };
  
  // Helper function to get most common strain per store
  const getMostCommonStrain = (entries) => {
    const strainCounts = new Map();
    entries.forEach(entry => {
      const strainName = entry.strain.name;
      strainCounts.set(strainName, (strainCounts.get(strainName) || 0) + 1);
    });
    
    let mostCommon = null;
    let highestCount = 0;
    
    strainCounts.forEach((count, strain) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommon = strain;
      }
    });
    
    return mostCommon;
  };
  
  const storeData = getStoreData();
  
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground mt-2">
          Visualize your consumption patterns and gain insights.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stores">Store Data</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
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
          </div>
        </TabsContent>
        
        <TabsContent value="stores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Purchases</CardTitle>
              <CardDescription>
                Track which stores you've purchased strains from
              </CardDescription>
            </CardHeader>
            <CardContent>
              {storeData.length > 0 ? (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {storeData.map((store, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Store className="h-5 w-5" />
                          {store.storeName}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Unique Strains:</span> {store.strainCount}
                          </p>
                          {store.mostCommonStrain && (
                            <p className="text-sm">
                              <span className="font-medium">Most Purchased Strain:</span> {store.mostCommonStrain}
                            </p>
                          )}
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Strains from this store:</p>
                            <div className="flex flex-wrap gap-2">
                              {Array.from(new Set(store.entries.map(entry => entry.strain.name))).map(strain => (
                                <Badge key={strain} variant="outline" className="bg-cannabis-50 text-cannabis-700">
                                  {strain}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Store className="h-12 w-12 mb-4 opacity-50" />
                  <p>No store data available yet.</p>
                  <p className="text-sm mt-2">Add store information when logging your consumption.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effects" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
