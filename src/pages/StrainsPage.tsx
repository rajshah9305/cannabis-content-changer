
import React, { useState } from 'react';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import StrainCard from '@/components/StrainCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StrainsPage: React.FC = () => {
  const { strains, toggleFavoriteStrain } = useConsumptionStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter strains based on search query
  const filteredStrains = strains.filter(strain => 
    strain.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    strain.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group by favorites
  const favoriteStrains = filteredStrains.filter(strain => strain.favorite);
  const otherStrains = filteredStrains.filter(strain => !strain.favorite);
  
  // Function to toggle strain favorite status
  const handleFavoriteToggle = (strainId: string) => {
    toggleFavoriteStrain(strainId);
    toast({
      title: "Strain Updated",
      description: "Favorite status has been updated.",
    });
  };
  
  // Mock functions for edit/delete (to be implemented in future)
  const handleEdit = () => {
    toast({
      title: "Feature coming soon",
      description: "Strain editing will be available in the next update.",
    });
  };
  
  const handleDelete = () => {
    toast({
      title: "Feature coming soon",
      description: "Strain deletion will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strains</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your cannabis strain library.
          </p>
        </div>
        
        <Button className="flex items-center gap-2 bg-cannabis-500 hover:bg-cannabis-600">
          <Plus className="h-4 w-4" />
          <span>Add Strain</span>
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search strains..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {favoriteStrains.length > 0 && (
        <div>
          <Label className="text-md font-medium">Favorites</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {favoriteStrains.map(strain => (
              <StrainCard
                key={strain.id}
                strain={strain}
                onFavoriteToggle={handleFavoriteToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {otherStrains.length > 0 && (
        <div>
          <Label className="text-md font-medium">{favoriteStrains.length > 0 ? 'Other Strains' : 'All Strains'}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {otherStrains.map(strain => (
              <StrainCard
                key={strain.id}
                strain={strain}
                onFavoriteToggle={handleFavoriteToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {filteredStrains.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No strains found. Try a different search or add a new strain.</p>
        </div>
      )}
    </div>
  );
};

export default StrainsPage;
