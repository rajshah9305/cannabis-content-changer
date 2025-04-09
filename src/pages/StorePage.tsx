
import React, { useState } from 'react';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Store, Search } from 'lucide-react';
import { ConsumptionWithStrain } from '@/models/types';

const StorePage: React.FC = () => {
  const { consumptionEntries } = useConsumptionStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract store data from consumption entries
  const getStoreData = () => {
    const storeMap = new Map<string, ConsumptionWithStrain[]>();
    
    consumptionEntries.forEach(entry => {
      const store = entry.store || 'Unknown';
      if (!storeMap.has(store)) {
        storeMap.set(store, []);
      }
      storeMap.get(store)?.push(entry);
    });
    
    return Array.from(storeMap).map(([storeName, entries]) => ({
      storeName,
      entries,
      strainCount: new Set(entries.map(entry => entry.strain.name)).size,
      mostCommonStrain: getMostCommonStrain(entries),
      totalPurchases: entries.length,
    }));
  };
  
  // Helper function to get most common strain per store
  const getMostCommonStrain = (entries: ConsumptionWithStrain[]) => {
    const strainCounts = new Map<string, number>();
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
  
  // Filter stores based on search query
  const filteredStores = storeData.filter(store => 
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
        <p className="text-muted-foreground mt-2">
          Track which dispensaries you've purchased from and what strains they carry.
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stores..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStores.length > 0 ? (
          filteredStores.map((store, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  {store.storeName}
                </CardTitle>
                <CardDescription>
                  {store.totalPurchases} purchases, {store.strainCount} unique strains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {store.mostCommonStrain && (
                    <p className="text-sm">
                      <span className="font-medium">Most Purchased Strain:</span> {store.mostCommonStrain}
                    </p>
                  )}
                  <div>
                    <p className="text-sm font-medium mb-2">Available Strains:</p>
                    <ScrollArea className="h-[100px]">
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(store.entries.map(entry => entry.strain.name))).map((strain, idx) => (
                          <Badge key={idx} variant="outline" className="bg-cannabis-50 text-cannabis-700">
                            {strain}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Store className="h-12 w-12 mb-4 opacity-50" />
            <p>No store data available yet.</p>
            <p className="text-sm mt-2">Add store information when logging your consumption.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
