
import React, { useState } from 'react';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import ConsumptionCard from '@/components/ConsumptionCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const HistoryPage: React.FC = () => {
  const { consumptionEntries, deleteConsumptionEntry } = useConsumptionStore();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  
  // Apply filters
  const filteredEntries = consumptionEntries.filter(entry => {
    const matchesSearch = 
      entry.strain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMethod = !filterMethod || entry.method === filterMethod;
    
    const matchesDate = !filterDate || format(new Date(entry.date), 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');
    
    return matchesSearch && matchesMethod && matchesDate;
  });
  
  // Group entries by date
  const groupedEntries: Record<string, typeof filteredEntries> = {};
  filteredEntries.forEach(entry => {
    const dateKey = format(new Date(entry.date), 'yyyy-MM-dd');
    if (!groupedEntries[dateKey]) {
      groupedEntries[dateKey] = [];
    }
    groupedEntries[dateKey].push(entry);
  });
  
  // Sort date keys in descending order (newest first)
  const dateKeys = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
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
  
  // Clear filters function
  const clearFilters = () => {
    setSearchQuery('');
    setFilterMethod('');
    setFilterDate(undefined);
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-2">
          View and search your past consumption entries.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search strains, notes, effects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <Label htmlFor="method-filter" className="mb-1 block">Method</Label>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger id="method-filter" className="w-full md:w-[180px]">
                <SelectValue placeholder="All methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All methods</SelectItem>
                <SelectItem value="Smoke">Smoke</SelectItem>
                <SelectItem value="Vape">Vape</SelectItem>
                <SelectItem value="Edible">Edible</SelectItem>
                <SelectItem value="Tincture">Tincture</SelectItem>
                <SelectItem value="Topical">Topical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <Label htmlFor="date-filter" className="mb-1 block">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-filter"
                  variant="outline"
                  className="w-full md:w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filterDate ? format(filterDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {(searchQuery || filterMethod || filterDate) && (
            <div className="w-full md:w-auto self-end">
              <Button variant="ghost" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
      
      {dateKeys.length > 0 ? (
        <div className="space-y-8">
          {dateKeys.map(dateKey => (
            <div key={dateKey} className="space-y-2">
              <h2 className="text-lg font-semibold mt-2">
                {format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}
              </h2>
              <div className="space-y-4">
                {groupedEntries[dateKey].map(entry => (
                  <ConsumptionCard 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No entries found. Try different search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
