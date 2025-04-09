
import React from 'react';
import { format } from 'date-fns';
import { Star, Clock, Cannabis, Trash2, Edit } from 'lucide-react';
import { ConsumptionWithStrain } from '../models/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface ConsumptionCardProps {
  entry: ConsumptionWithStrain;
  onDelete: (id: string) => void;
  onEdit: (entry: ConsumptionWithStrain) => void;
}

const ConsumptionCard: React.FC<ConsumptionCardProps> = ({ entry, onDelete, onEdit }) => {
  // Generate stars for rating
  const renderRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
      />
    ));
  };
  
  // Get badge color based on strain type
  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case 'Indica': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Sativa': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Hybrid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'CBD': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="mb-4 overflow-hidden border border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{entry.strain.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {format(new Date(entry.date), 'MMM d, yyyy - h:mm a')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              className={getStrainTypeColor(entry.strain.type)} 
              variant="outline"
            >
              {entry.strain.type}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(entry)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(entry.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Amount:</span>
            <span className="ml-1 font-medium">{entry.amount} {entry.unit}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Method:</span>
            <span className="ml-1 font-medium">{entry.method}</span>
          </div>
        </div>
        
        {entry.notes && (
          <div className="text-sm mb-2">
            <p className="text-muted-foreground font-medium">Notes:</p>
            <p>{entry.notes}</p>
          </div>
        )}
        
        {(entry.moodEffects.length > 0 || entry.physicalEffects.length > 0) && (
          <div className="mt-2">
            {entry.moodEffects.length > 0 && (
              <div className="mb-1">
                <span className="text-xs text-muted-foreground">Mood Effects:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.moodEffects.map(effect => (
                    <Badge key={effect} variant="secondary" className="text-xs">{effect}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {entry.physicalEffects.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">Physical Effects:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.physicalEffects.map(effect => (
                    <Badge key={effect} variant="secondary" className="text-xs">{effect}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Cannabis className="h-4 w-4 text-cannabis-500 mr-1" />
            <span className="text-sm font-medium">{entry.strain.thcContent}% THC</span>
            {entry.strain.cbdContent && entry.strain.cbdContent > 0 && (
              <span className="text-sm font-medium ml-2">{entry.strain.cbdContent}% CBD</span>
            )}
          </div>
          <div className="flex items-center">
            {renderRating(entry.rating)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConsumptionCard;
